<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyAnswerRequest;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Answer;
use App\Models\Question;
use App\Models\QuestionAnswer;
use App\Models\Survey;
use App\OptionType;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        return SurveyResource::collection(Survey::where("user_id", $user->id)->paginate(6));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }

        $survey = Survey::create($data);

        // Create new questions
        foreach ($data['questions'] as $question) {
            $question['survey_id'] = $survey->id;
            $this->createQuestion($question);
        }

        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();

        if ($user->id !== $survey->user_id) {
            abort(403, 'Unauthorized action.');
        }

        return new SurveyResource($survey);
    }

    /**
     * Display the specified resource for all users.
     */
    public function showForGuests(Survey $survey)
    {
        return new SurveyResource($survey);
    }

    public function storeAnswer(StoreSurveyAnswerRequest $request, Survey $survey)
    {
        $validated = $request->validated();

        $surveyAnswer = Answer::create([
            'survey_id' => $survey->id,
            'start_date' => date('Y-m-d H:i:s'),
            'end_date' => date('Y-m-d H:i:s')
        ]);

        foreach ($validated['answers'] as $questionId => $answer) {
            $question = Question::where(['id' => $questionId, 'survey_id' => $survey->id])->get();

            if (!$question) {
                return response('Invalid question ID: ' . $questionId, 400);
            }

            $data = [
                'question_id' => $questionId,
                'answer_id' => $surveyAnswer->id,
                'answer' => is_array($answer) ? json_encode($answer) : $answer
            ];

            QuestionAnswer::create($data);
        }

        return response('', 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            // If there's an old image, delete it
            if ($survey->image) {
                Storage::disk('public')->delete($survey->image);
            }
        }

        $survey->update($data);

        // Get ids as play array of existing questions
        $existingIds = $survey->questions()->pluck('id')->toArray();
        // Get ids as plain array of new questions
        $newIds = Arr::pluck($data['questions'], 'id');
        // Find questions to delete
        $toDelete = array_diff($existingIds, $newIds);
        // Find questions to add
        $toAdd = array_diff($newIds, $existingIds);
        // Delete questions by $toDelete array 
        Question::destroy($toDelete);
        // Create new questions
        foreach ($data['questions'] as $question) {
            if (in_array($question['id'], $toAdd)) {
                $question['survey_id'] = $survey->id;
                $this->createQuestion($question);
            }
        }

        // Update existing question
        $questionMap = collect($data['questions'])->keyBy('id');
        foreach ($survey->questions as $question) {
            if (isset($questionMap[$question->id])) {
                $this->updateQuestion($question, $questionMap[$question->id]);
            }
        }

        return new SurveyResource($survey);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();

        if ($user->id !== $survey->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $survey->delete();

        // If there's an old image, delete it
        if ($survey->image) {
            Storage::disk('public')->delete($survey->image);
        }

        return response('', 204);
    }

    private function saveImage($image): string
    {
        // Check if image is valid base64 string
        if (preg_match("/^data:image\/(\w+);base64,/", $image, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ",") + 1);
            // get the file extension
            $type = strtolower($type[1]);

            // Check if file is an image 
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('Invalid image type.');
            }

            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);
        } else {
            throw new \Exception('Did not match data URI with image data');
        }

        $file = uniqid() . '.' . $type;
        $relativePath = 'images/' . $file;
        Storage::disk('public')->put($relativePath, $image);

        return $relativePath;
    }

    private function createQuestion($data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }

        $validator = Validator::make($data, [
            'question' => 'required|string',
            'type' => ['required', Rule::enum(OptionType::class)],
            'description' => 'nullable|string',
            'data' => 'present',
            'survey_id' => 'exists:App\Models\Survey,id'
        ]);

        return Question::create($validator->validated());
    }

    private function updateQuestion(Question $question, $data)
    {
        if (is_array($data['data'])) {
            $data['data'] = json_encode($data['data']);
        }
        $validator = Validator::make($data, [
            'id' => 'exists:App\Models\Question,id',
            'question' => 'required|string',
            'type' => ['required', Rule::enum(OptionType::class)],
            'description' => 'nullable|string',
            'data' => 'present',
        ]);

        return $question->update($validator->validated());
    }
}

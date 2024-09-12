<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
// use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class SurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'image_url' => URL::to('storage/' . $this->image),
            'user_id' => $this->user_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'status' => $this->status,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'expire_date' => $this->expire_date,
            'questions' => QuestionResource::collection($this->questions)
        ];
    }
}

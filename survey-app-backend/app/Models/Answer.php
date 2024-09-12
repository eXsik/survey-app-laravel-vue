<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = ['survey_id', 'start_date', 'end_date'];

    public function survey(): BelongsTo
    {
        return $this->belongsTo(Survey::class);
    }
}

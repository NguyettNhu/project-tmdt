<?php

namespace App\Helpers;

class SlugHelper
{
    public static function convertToSlug($title)
    {
        $from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđĐ";
        $to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyydD";
        
        $titleWithoutDiacritics = str_replace(
            mb_str_split($from),
            mb_str_split($to),
            $title
        );

        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $titleWithoutDiacritics)));
    }
}

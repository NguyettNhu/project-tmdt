<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    private $table;

    private $module;

    private $model;

    public function __construct()
    {
        session()->forget('success');

        $this->module = request()->segment(2);

        $this->model = new Setting();

        $this->table = $this->model->table;
    }

    public function index()
    {
        $info = $this->model::where('key', 'info')->value('value');
        $info = json_decode($info, true);

        $sendmail = $this->model::where('key', 'sendmail')->value('value');
        $sendmail = json_decode($sendmail, true);

        $seo = $this->model::where('key', 'seo')->value('value');
        $seo = json_decode($seo, true);

        // $schema_website = $this->model::where('key', 'schema_website')->value('value');
        // $schema_website = json_decode($schema_website, true);

        return view("{$this->module}.main", [
            'info' => $info,
            'sendmail' => $sendmail,
            'seo' => $seo,
            // 'schema_website' => $schema_website,
        ]);
    }

    public function ajax_info(Request $request)
    {
        $key = 'info';

        $validatedData = $request->validate([
            "name" => "nullable|string|max:255",
            "email" => "nullable|string|max:255",
            "phone" => "nullable|string|max:255",
            "hotline" => "nullable|string|max:255",
            "address" => "nullable|string|max:255",
            "office" => "nullable|string|max:255",
            "description" => "nullable|string|max:255",
            "website" => "nullable|string|max:255",
            "zalo" => "nullable|string|max:255",
            "facebook" => "nullable|string|max:255",
            "messenger" => "nullable|string|max:255",
            "instagram" => "nullable|string|max:255",
            "copy_right" => "nullable|string|max:255",
            "slogan" => "nullable|string|max:255",
        ]);

        try {
            $jsonData = json_encode($validatedData);

            $existing = $this->model->where('key', $key)->first();

            if ($existing && $existing->value === $jsonData) {
                return response()->json([
                    'success' => true,
                    'message' => __('messages.no_changes_made')
                ]);
            }

            $userId = auth()->check() ? auth()->user()->id : null;

            $this->model->updateOrCreate(
                ['key' => $key],
                [
                    'value' => $jsonData,
                    'created_by' => $userId,
                    'updated_by' => $userId
                ]
            );

            session()->flash('success', __('messages.data_updated'));

            return response()->json([
                'success' => true,
                'message' => __('messages.data_updated')
            ]);

        } catch (\Exception $e) {
            \Log::error("Error inserting {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }

    public function ajax_sendmail(Request $request)
    {
        $key = 'sendmail';

        $validatedData = $request->validate([
            "mailer" => "nullable|string|max:255",
            "host" => "nullable|string|max:255",
            "port" => "nullable|string|max:255",
            "username" => "nullable|string|max:255",
            "password" => "nullable|string|max:255",
            "encryction" => "nullable|string|max:255",
            "from_address" => "nullable|string|max:255",
            "from_name" => "nullable|string|max:255"
        ]);

        try {
            $jsonData = json_encode($validatedData);

            $existing = $this->model->where('key', $key)->first();

            if ($existing && $existing->value === $jsonData) {
                return response()->json([
                    'success' => true,
                    'message' => __('messages.no_changes_made')
                ]);
            }

            $userId = auth()->check() ? auth()->user()->id : null;

            $this->model->updateOrCreate(
                ['key' => $key],
                [
                    'value' => $jsonData,
                    'created_by' => $userId,
                    'updated_by' => $userId
                ]
            );

            session()->flash('success', __('messages.data_updated'));

            return response()->json([
                'success' => true,
                'message' => __('messages.data_updated')
            ]);

        } catch (\Exception $e) {
            \Log::error("Error inserting {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }

    public function ajax_seo(Request $request)
    {
        $key = 'seo';

        $validatedData = $request->validate([
            "title_seo" => "nullable|string|max:255",
            "description_seo" => "nullable|string|max:255",
            "canonical_seo" => "nullable|string|max:255",

            "author_seo" => "nullable|string|max:255",
            "generator" => "nullable|string|max:255",

            "google_analytics" => "nullable|string",
            "google_ads" => "nullable|string",

            "fb_app_id" => "nullable|string|max:255",
            "fb_admins" => "nullable|string|max:255",

            "og_locale" => "nullable|string|max:255",
            "og_title" => "nullable|string|max:255",
            "og_description" => "nullable|string|max:255",
            "og_url" => "nullable|string|max:255",
            "og_image" => "nullable|string|max:255",
            "og_image_alt" => "nullable|string|max:255",
            "og_site_name" => "nullable|string|max:255",
        ]);

        try {
            $jsonData = json_encode($validatedData);

            $existing = $this->model->where('key', $key)->first();

            if ($existing && $existing->value === $jsonData) {
                return response()->json([
                    'success' => true,
                    'message' => __('messages.no_changes_made')
                ]);
            }

            $userId = auth()->check() ? auth()->user()->id : null;

            $this->model->updateOrCreate(
                ['key' => $key],
                [
                    'value' => $jsonData,
                    'created_by' => $userId,
                    'updated_by' => $userId
                ]
            );

            session()->flash('success', __('messages.data_updated'));

            return response()->json([
                'success' => true,
                'message' => __('messages.data_updated')
            ]);

        } catch (\Exception $e) {
            \Log::error("Error inserting {$this->module}: {$e->getMessage()}");

            return response()->json([
                'success' => false,
                'message' => __('messages.unexpected_error')
            ], 500);
        }
    }

    // public function ajax_schema_website(Request $request)
    // {
    //     $key = 'schema_website';

    //     $validatedData = $request->validate([
    //         "description" => "nullable|string",
    //     ]);

    //     try {
    //         $jsonData = json_encode($validatedData);

    //         $existing = $this->model->where('key', $key)->first();

    //         if ($existing && $existing->value === $jsonData) {
    //             return response()->json([
    //                 'success' => true,
    //                 'message' => __('messages.no_changes_made')
    //             ]);
    //         }

    //         $userId = auth()->check() ? auth()->user()->id : null;

    //         $this->model->updateOrCreate(
    //             ['key' => $key],
    //             [
    //                 'value' => $jsonData,
    //                 'created_by' => $userId,
    //                 'updated_by' => $userId
    //             ]
    //         );

    //         session()->flash('success', __('messages.data_updated'));

    //         return response()->json([
    //             'success' => true,
    //             'message' => __('messages.data_updated')
    //         ]);

    //     } catch (\Exception $e) {
    //         \Log::error("Error inserting {$this->module}: {$e->getMessage()}");

    //         return response()->json([
    //             'success' => false,
    //             'message' => __('messages.unexpected_error')
    //         ], 500);
    //     }
    // }
}

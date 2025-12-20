<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('parent_id')->nullable()->after('status');
            $table->unsignedBigInteger('created_by')->nullable()->after('parent_id');
            $table->unsignedBigInteger('updated_by')->nullable()->after('created_by');
            $table->integer(column: 'sold')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['status', 'parent_id', 'created_by', 'updated_by','sold']);
        });
    }
};

using Microsoft.EntityFrameworkCore.Migrations;

namespace VideoImagePlatform.Migrations
{
    public partial class AddViewsField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Views",
                table: "Videos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Views",
                table: "Videos");
        }
    }
}

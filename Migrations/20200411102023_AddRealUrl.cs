using Microsoft.EntityFrameworkCore.Migrations;

namespace VideoImagePlatform.Migrations
{
    public partial class AddRealUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "realUrl",
                table: "Videos",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "realUrl",
                table: "Images",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "realUrl",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "realUrl",
                table: "Images");
        }
    }
}

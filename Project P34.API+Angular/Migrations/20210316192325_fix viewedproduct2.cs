using Microsoft.EntityFrameworkCore.Migrations;

namespace Project_P34.API_Angular.Migrations
{
    public partial class fixviewedproduct2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblViewedProducts_AspNetUsers_UserId",
                table: "tblViewedProducts");

            migrationBuilder.DropIndex(
                name: "IX_tblViewedProducts_UserId",
                table: "tblViewedProducts");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "tblViewedProducts",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_tblViewedProducts_AspNetUsers_Id",
                table: "tblViewedProducts",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblViewedProducts_AspNetUsers_Id",
                table: "tblViewedProducts");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "tblViewedProducts",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tblViewedProducts_UserId",
                table: "tblViewedProducts",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_tblViewedProducts_AspNetUsers_UserId",
                table: "tblViewedProducts",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

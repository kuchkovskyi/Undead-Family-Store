using Microsoft.EntityFrameworkCore.Migrations;

namespace Project_P34.API_Angular.Migrations
{
    public partial class fixlinksCart : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblCart_tblUserMoreInfo_Id",
                table: "tblCart");

            migrationBuilder.AddForeignKey(
                name: "FK_tblCart_AspNetUsers_Id",
                table: "tblCart",
                column: "Id",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblCart_AspNetUsers_Id",
                table: "tblCart");

            migrationBuilder.AddForeignKey(
                name: "FK_tblCart_tblUserMoreInfo_Id",
                table: "tblCart",
                column: "Id",
                principalTable: "tblUserMoreInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

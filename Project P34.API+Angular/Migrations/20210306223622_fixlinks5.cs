using Microsoft.EntityFrameworkCore.Migrations;

namespace Project_P34.API_Angular.Migrations
{
    public partial class fixlinks5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblViewedProducts_tblUserMoreInfo_Id",
                table: "tblViewedProducts");

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

            migrationBuilder.AddForeignKey(
                name: "FK_tblViewedProducts_tblUserMoreInfo_Id",
                table: "tblViewedProducts",
                column: "Id",
                principalTable: "tblUserMoreInfo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

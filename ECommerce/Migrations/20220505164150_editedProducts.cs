using Microsoft.EntityFrameworkCore.Migrations;

namespace ECommerce.Migrations
{
    public partial class editedProducts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Products_userId",
                table: "Products",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Users_userId",
                table: "Products",
                column: "userId",
                principalTable: "Users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Users_userId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_userId",
                table: "Products");
        }
    }
}

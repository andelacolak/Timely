using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TimelyServerApp.Migrations
{
    public partial class SeededData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "Name", "Note" },
                values: new object[,]
                {
                    { 1, "Project name 1", "This is the first project" },
                    { 2, "Project name 2", "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" },
                    { 3, "Project name 3", "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout" },
                    { 4, "Project name 4", "sometimes by accident, sometimes on purpose (injected humour and the like)" }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "design" });

            migrationBuilder.InsertData(
                table: "WorkSessions",
                columns: new[] { "Id", "Description", "EndDate", "ProjectId", "StartDate" },
                values: new object[] { 1, "This is seeded work session", null, 1, new DateTime(2019, 10, 19, 17, 27, 48, 856, DateTimeKind.Local).AddTicks(7240) });

            migrationBuilder.InsertData(
                table: "WorkSessionTag",
                columns: new[] { "TagId", "WorkSessionId" },
                values: new object[] { 1, 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "WorkSessionTag",
                keyColumns: new[] { "TagId", "WorkSessionId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "WorkSessions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Projects",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}

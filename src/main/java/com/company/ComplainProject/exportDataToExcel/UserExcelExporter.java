package com.company.ComplainProject.exportDataToExcel;

import com.company.ComplainProject.model.Roles;
import com.company.ComplainProject.model.User;
import com.company.ComplainProject.repository.UserRepository;
import com.company.ComplainProject.service.UserService;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class UserExcelExporter {

    @Autowired
    UserRepository userRepository;

    private XSSFWorkbook workbook;
    private XSSFSheet sheet;

    private List<User> userData;

    public UserExcelExporter(List<User> userrecord){
        userData = userrecord;
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet("Users Data");
    }

    public void writeHeaderRow(){
        Row row = sheet.createRow(0);

        Cell cell = row.createCell(0);
        cell.setCellValue("User Id");

        cell = row.createCell(1);
        cell.setCellValue("First Name");

        cell = row.createCell(2);
        cell.setCellValue("Last Name");

        cell = row.createCell(3);
        cell.setCellValue("Email");

        cell = row.createCell(4);
        cell.setCellValue("Contact Number");

        cell = row.createCell(5);
        cell.setCellValue("CNIC");

        cell = row.createCell(6);
        cell.setCellValue(" Number Of Family Members");

        cell = row.createCell(7);
        cell.setCellValue("Area");

        cell = row.createCell(8);
        cell.setCellValue("Floor Number");

        cell = row.createCell(9);
        cell.setCellValue("House Number");

        cell = row.createCell(10);
        cell.setCellValue("Street");

        cell = row.createCell(11);
//        cell.setCellStyle();
        cell.setCellValue("Role");

    }
    public void writeDataRows(){

        int rowCount =1;

        for (User user:userData) {
            Row row = sheet.createRow(rowCount);

            Cell cell = row.createCell(0);
            cell.setCellValue(user.getId());

            cell = row.createCell(1);
            cell.setCellValue(user.getFirstname());

            cell = row.createCell(2);
            cell.setCellValue(user.getLastname());

            cell = row.createCell(3);
            cell.setCellValue(user.getEmail());

            cell = row.createCell(4);
            cell.setCellValue(user.getPhoneNumber());

            cell = row.createCell(5);
            cell.setCellValue(user.getCnic());

            cell = row.createCell(6);
            cell.setCellValue(user.getNumberOfFamilyMembers());

            cell = row.createCell(7);
            cell.setCellValue(user.getArea().getName());

            cell = row.createCell(8);
            cell.setCellValue(user.getAddress().getFloorNumber());

            cell = row.createCell(9);
            cell.setCellValue(user.getAddress().getHouseNumber());

            cell = row.createCell(10);
            cell.setCellValue(user.getAddress().getStreet());

            ArrayList<String> listOfRoles = new ArrayList<>();
            for (Roles role:user.getRoles()) {
                listOfRoles.add(role.getName());
            }

            cell = row.createCell(11);
            cell.setCellValue(listOfRoles.toString());

            rowCount +=1;
        }



    }
    public void exportData(HttpServletResponse response) throws IOException {
        writeHeaderRow();
        writeDataRows();

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
        outputStream.close();

    }

}

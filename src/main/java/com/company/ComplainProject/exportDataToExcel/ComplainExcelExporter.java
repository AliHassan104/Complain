package com.company.ComplainProject.exportDataToExcel;

import com.company.ComplainProject.dto.ComplainDto;
import com.company.ComplainProject.model.Complain;
import com.company.ComplainProject.model.User;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

public class ComplainExcelExporter {
    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<ComplainDto> complainList;

    public ComplainExcelExporter(List<ComplainDto> complains){
        workbook = new XSSFWorkbook();
        sheet =workbook.createSheet("View Complain");
        complainList = complains;
    }

    public void writeHeaderRow(){
        Row row = sheet.createRow(0);

        Cell cell = row.createCell(0);
        cell.setCellValue("Complian Id");

        cell = row.createCell(1);
        cell.setCellValue("Complain Name");

        cell = row.createCell(2);
        cell.setCellValue("Complain Date");

        cell = row.createCell(3);
        cell.setCellValue("Area");

        cell = row.createCell(4);
        cell.setCellValue("Complainer Name");

        cell = row.createCell(5);
        cell.setCellValue("Complainer Contact-Number");

    }
    public void writeDataRow(){
        int rowCount =1;

        for (ComplainDto complain:complainList) {
            Row row = sheet.createRow(rowCount);

            Cell cell = row.createCell(0);
            cell.setCellValue(complain.getId());

            cell = row.createCell(1);
            cell.setCellValue(complain.getComplainType().getName());

            cell = row.createCell(2);
            cell.setCellValue(complain.getDate().toString());

            cell = row.createCell(3);
            cell.setCellValue(complain.getArea().getName());

            cell = row.createCell(4);
            cell.setCellValue(complain.getUser().getFirstname()+" "+complain.getUser().getLastname());

            cell = row.createCell(5);
            cell.setCellValue(complain.getUser().getPhoneNumber());


            rowCount+=1;
        }
    }

    public void export(HttpServletResponse response) throws IOException {
        writeHeaderRow();
        writeDataRow();

        ServletOutputStream servletOutputStream = response.getOutputStream();
        workbook.write(servletOutputStream);
        workbook.close();
        servletOutputStream.close();

    }

}

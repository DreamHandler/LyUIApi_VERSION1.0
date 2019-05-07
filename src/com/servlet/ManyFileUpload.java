package com.servlet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadBase;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class ManyFileUpload extends HttpServlet
{
  public void doGet(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
    doPost(request, response);
  }

  @SuppressWarnings("rawtypes")
public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
    String savePath = "";
    String FilePath = request.getParameter("FilePath");
    String[] FilePaths = FilePath.split("\\,");

    DiskFileItemFactory fac = new DiskFileItemFactory();
    ServletFileUpload upload = new ServletFileUpload(fac);
    String SCWJZDZ = "100";

    upload.setFileSizeMax(Integer.parseInt(SCWJZDZ) * 1024 * 1024);
    upload.setHeaderEncoding("utf-8");
	List fileList = null;
    boolean bool = true;
    try {
      fileList = upload.parseRequest(request);
    }
    catch (FileUploadBase.FileSizeLimitExceededException e) {
      bool = false;
    } catch (FileUploadBase.SizeLimitExceededException e1) {
      System.out.println("总文件太大");
    } catch (Exception e2) {
      e2.printStackTrace();
    }
    if (bool)
    {
      Iterator it = fileList.iterator();
      String name = "";
      while (it.hasNext()) {
        FileItem item = (FileItem)it.next();
        byte[] b = item.get();
        name = item.getName();
        if ((name == null) || (name.trim().equals(""))) {
          continue;
        }
        for (int i = 0; i < FilePaths.length; i++) {
          try {
            savePath = FilePaths[i] + "/";
            File f1 = new File(savePath);

            if (!f1.exists()) {
              f1.mkdirs();
            }
            OutputStream os = new FileOutputStream(new File(savePath + name), true);
            os.write(b);
            os.close();
          } catch (Exception e) {
            e.printStackTrace();
          }
        }
      }
      response.getWriter().print(name);
    }
  }
}
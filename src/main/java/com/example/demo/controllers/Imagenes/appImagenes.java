package com.example.demo.controllers.Imagenes;

import java.io.File;
import java.io.FileOutputStream;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("Imagen")
@CrossOrigin(origins = "*")
public class appImagenes {
    @RequestMapping(value = "/subir", method = RequestMethod.POST)
    public String subirArchivo(@RequestParam("file") MultipartFile file) {
        String filePath = System.getProperty("user.dir") + "/apiSpringBoot/demo/src/main/resources/static/assets/img/"
                + File.separator + file.getOriginalFilename();
        String fileUploadStatus;

        try{
            FileOutputStream fout = new FileOutputStream(filePath);
            fout.write(file.getBytes());
            fout.close();
            fileUploadStatus = "Subida exitosa";
        }
        catch(Exception e){
            e.printStackTrace();
            fileUploadStatus = "Error en la subida";
        }

        return filePath;
    }
}
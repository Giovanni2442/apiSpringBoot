package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.models.calzadoModel;

public interface appMongoClzd extends MongoRepository<calzadoModel,String> {
}

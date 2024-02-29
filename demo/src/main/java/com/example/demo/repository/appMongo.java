package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.models.usserModel;
public interface appMongo extends MongoRepository<usserModel,String> {
}

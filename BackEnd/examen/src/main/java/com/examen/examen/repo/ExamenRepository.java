package com.examen.examen.repo;

import com.examen.examen.model.Examen;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExamenRepository extends MongoRepository <Examen, String> {
}

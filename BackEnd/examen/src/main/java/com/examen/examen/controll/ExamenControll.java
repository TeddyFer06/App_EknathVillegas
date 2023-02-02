package com.examen.examen.controll;


import com.examen.examen.model.Examen;
import com.examen.examen.repo.ExamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/examen/")
public class ExamenControll {


    @Autowired
    private ExamenRepository examenRepository;

    @GetMapping("")
    List<Examen> index () {
        return examenRepository.findAll();
    }

    //CREATE
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("")
    Examen create (@RequestBody Examen examen){
        return examenRepository.save(examen);
    }

    //UPDATE
    @PutMapping("{id}")
    Examen update (@PathVariable String id, @RequestBody Examen examen) {
        Examen examenfromDB = examenRepository.findById(id).orElseThrow(RuntimeException::new);

            examenfromDB.setEmail(examen.getEmail());
            examenfromDB.setMailPass(examen.getMailPass());
            examenfromDB.setPhone(examen.getPhone());
            examenfromDB.setCountryPhone(examen.getCountryPhone());
            examenfromDB.setTag(examen.getTag());
            examenfromDB.setCreatedAt(examen.getCreatedAt());
            examenfromDB.setActive(examen.isActive());

            return examenRepository.save(examenfromDB);
    }

    //DELETE
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{id}")
    void delete (@PathVariable String id) {
        Examen examen = examenRepository.findById(id).orElseThrow(RuntimeException::new);

        examenRepository.delete(examen);
    }



}

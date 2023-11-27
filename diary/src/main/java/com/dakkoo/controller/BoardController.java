package com.dakkoo.diary.controller;

import org.springframework.stereotype.Controller;

@Controller
@RequestMapping("/diary")
public class BoardController{
    @GetMapping("/dakkoo/login")
    public String saveForm(){
        return "login.html";
    }
}
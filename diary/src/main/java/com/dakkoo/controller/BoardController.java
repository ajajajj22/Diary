package com.dakoo.diary.controller;

import org.springframework.stereotype.Controller;

@Controller
@RequestMapping("/diary")
public class BoardController{
    @GetMapping("/login")
    public String saveForm(){
        return "login.html";
    }
}
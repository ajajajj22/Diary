package com.example.Diary.controller;

import org.springframework.stereotype.Controller;

@Controller
@RequestMapping("/demo")
public class BoardController{
    @GetMapping("/login")
    public String saveForm(){
        return "login";
    }
}
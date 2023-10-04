package com.example.Diary.controller;

import org.springframework.stereotype.Controller;

@Controller
@RequestMapping("/Diary")
public class BoardController{
    @GetMapping("/join")
    public String saveForm(){
        return "join";
    }
}
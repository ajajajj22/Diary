package com.dakkoo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class MemberController {
    // 회원가입 페이지 출력 요청
    @GetMapping("/dakko/register")
    public String registerForm() {
        return "register";
    }

    @PostMapping("/dakko/register")
    public String register(@RequestParam("memberEmail") String memberEmail){
        System.out.println("MemberController.register");
        System.out.println("memberEmail = " + memberEmail);
        return "login.html";
    }
}
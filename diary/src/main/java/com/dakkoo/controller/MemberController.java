package com.example.Diary.controller;

@Controller
public class MemberController {
    // 회원가입 페이지 출력 요청
    @GetMapping("/member/register")
    public String registerForm() {
        return "register";
    }

    @PostMapping("/")
}
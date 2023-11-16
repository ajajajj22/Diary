import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {
    // 회원가입 페이지 출력 요청
    @GetMapping("/register")
    public String registerForm() {
        return "register";
    }

    @PostMapping("/register")
    public String register(@RequestParam("memberEmail") String memberEmail){
        System.out.println("MemberController.register");
        System.out.println("memberEmail = " + memberEmail);
        return "index.html";
    }
}
package com.dakkoo.member.service;

import com.dakkoo.member.dto.MemberDTO;
import com.dakkoo.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    public void save(MemberDTO memberDTO) {
    }
}

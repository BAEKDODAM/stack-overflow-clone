package fourtuna.stackoverflowclone.member.controller;

import fourtuna.stackoverflowclone.member.dto.MemberPatchDto;
import fourtuna.stackoverflowclone.member.entity.Member;
import fourtuna.stackoverflowclone.member.mapper.MemberMapper;
import fourtuna.stackoverflowclone.member.service.MemberService;
import fourtuna.stackoverflowclone.response.MultiResponseDto;
import fourtuna.stackoverflowclone.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/user")
@Validated
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PatchMapping("/edit/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id")  @Positive long memberId,
                                      @Valid @RequestBody MemberPatchDto requestBody){
        requestBody.setMemberId(memberId);
        Member member = memberService.updateMember(mapper.memberPatchDtoToMember(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseDto(member)),
                HttpStatus.OK
        );

    }
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long memberId) {
        Member response = memberService.findMember(memberId); // 서비스계층과 연결 지점

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponseDto(response)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size);

        List<Member> members = pageMembers.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.membersToMemberResponseDtos(members),
                        pageMembers),
                HttpStatus.OK);

    }
}

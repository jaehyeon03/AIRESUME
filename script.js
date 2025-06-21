document.addEventListener("DOMContentLoaded", () => {
  // ✅ 1. 네비게이션 활성화
  const links = document.querySelectorAll('.nav-link');
  const currentPage = window.location.pathname.split("/").pop();
  
  let matchPage = currentPage;
  if (["resumemade.html", "resumemade2.html", "resumemade3.html", "resumemade4.html", "resumemade5.html"].includes(currentPage)) {
    matchPage = "resume.html";
  }

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === matchPage) {
      link.classList.add('active');
    }
  });

  // ✅ 2. 이력서 동의 폼 처리
  const form = document.getElementById('consentForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const personalInfoAgree = document.querySelector("input[name='personalInfoAgree']").checked;
      const etcInfoAgree = document.querySelector("input[name='etcInfoAgree']").checked;

      if (personalInfoAgree && etcInfoAgree) {
        window.location.href = 'resumemade4.html';
      } else {
        alert('필수 항목에 모두 동의하셔야 다음 단계로 넘어갑니다.');
      }
    });
  }

  // ✅ 3. 모달 처리
  const modal = document.getElementById("loginModal");
  const loginBtn = document.querySelector(".download-btn");
  const closeBtn = document.querySelector(".close");

  if (loginBtn && modal && closeBtn) {
    loginBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("로그인 시도! (기능은 추후 연동)");
      });
    }
  }

  // ✅ 4. 스크롤 처리
  const mouseScrollBtn = document.querySelector(".mouse");
  const explainEl = document.getElementById("explain");

  if (mouseScrollBtn && explainEl) {
    mouseScrollBtn.addEventListener("click", function () {
      explainEl.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ✅ 5. header 스타일 적용
  const headerEl = document.querySelector("header");
  if (headerEl) {
    headerEl.classList.add("active");
  }
});





document.addEventListener("DOMContentLoaded", () => {
  // 1) 이미지 미리보기 + 클릭 트리거
  const input = document.getElementById("profileInput");
  const preview = document.getElementById("profilePreview");
  if (input && preview) {
    preview.addEventListener("click", () => input.click());
    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const oldImg = preview.querySelector("img");
        if (oldImg) preview.removeChild(oldImg);

        const img = document.createElement("img");
        img.src = ev.target.result;
        img.alt = "프로필 사진";
        preview.insertBefore(img, preview.firstChild);
      };
      reader.readAsDataURL(file);
    });
  }

  // 2) 멀티 스텝 전환
  const form = document.getElementById("multiStepForm");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");
  const steps = document.querySelectorAll(".step-indicator .step");
  const divider = document.getElementById("divider-1");
  const contents = document.querySelectorAll(".form-content");

  let currentStep = 1;
  const totalSteps = steps.length; // 2 단계

  function showStep(step) {
    // (1) 콘텐츠 보이기/숨기기
    contents.forEach((content) => {
      const stepNum = parseInt(content.getAttribute("data-step-content"), 10);
      if (stepNum === step) content.classList.add("active");
      else content.classList.remove("active");
    });
    // (2) 인디케이터 토글
    steps.forEach((el) => {
      const stepNum = parseInt(el.getAttribute("data-step"), 10);
      if (stepNum === step) el.classList.add("active");
      else el.classList.remove("active");
    });
    // (3) 구분선 색상 변경
    divider.style.background = step > 1 ? "#007bff" : "#e0e0e0";
    // (4) 버튼 표시/숨기기
    if (step === 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "inline-block";
      nextBtn.textContent = "다음";
      submitBtn.style.display = "none";
    } else if (step === totalSteps) {
      prevBtn.style.display = "inline-block";
      nextBtn.style.display = "none";
      submitBtn.style.display = "inline-block";
    }
  }

  // 초기: 1단계 노출
  showStep(currentStep);

  nextBtn.addEventListener("click", () => {
    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
    }
  });
  prevBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("폼이 제출되었습니다!");
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // 모든 textarea에 대해 글자 수 감시
  const textareas = document.querySelectorAll(".section-group textarea");

  textareas.forEach((ta) => {
    const maxLen = Number(ta.getAttribute("data-maxlength") || 500);
    // 이 textarea 바로 아래에 있는 .char-count 안의 .current 엘리먼트를 찾음
    const counterEl = ta.parentElement.querySelector(".char-count .current");

    // 초기 글자 수 설정
    counterEl.textContent = ta.value.length;

    // 입력 이벤트가 발생할 때마다 업데이트
    ta.addEventListener("input", () => {
      const curLen = ta.value.length;
      if (curLen > maxLen) {
        // 만약 제한을 넘었으면 자르기
        ta.value = ta.value.substring(0, maxLen);
      }
      counterEl.textContent = ta.value.length;
    });
  });
});

// script.js
 
const selectedPers = new Set();
let selectedJob = null;
const MAX_PERS = 3;

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submitBtn');
  const jobBtns = document.querySelectorAll('.options-container2 .option-btn');
  const persBtns = document.querySelectorAll('.options-container .option-btn');
  const jobInput = document.querySelector('.options-container2 input[type="text"]');
  const persInput = document.querySelector('.options-container input[type="text"]');

  // 직무 버튼 로직
  jobBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      jobBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedJob = btn.dataset.value || btn.value || btn.placeholder;
      if (jobInput) jobInput.value = '';
      submitBtn.disabled = !(selectedJob && selectedPers.size > 0);
    });
  });

  // 직무 직접입력 필드 처리
  if (jobInput) {
    jobInput.addEventListener('input', () => {
      jobBtns.forEach(b => b.classList.remove('selected'));
      selectedJob = jobInput.value.trim();
      submitBtn.disabled = !(selectedJob && selectedPers.size > 0);
    });
  }

  // 성격 버튼 로직
  persBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.tagName.toLowerCase() === 'input') return;
      const val = btn.dataset.value || btn.value || btn.placeholder;
      if (!val) return;

      if (btn.classList.contains('selected')) {
        btn.classList.remove('selected');
        selectedPers.delete(val);
      } else if (selectedPers.size < MAX_PERS) {
        btn.classList.add('selected');
        selectedPers.add(val);
      } else {
        btn.classList.add('shake');
        btn.addEventListener('animationend', () => btn.classList.remove('shake'), { once: true });
        alert(`성격은 최대 ${MAX_PERS}개까지 선택할 수 있습니다.`);
      }
      if (persInput) persInput.value = '';
      submitBtn.disabled = !(selectedJob && selectedPers.size > 0);
    });
  });

  // 성격 직접입력 필드 처리
  if (persInput) {
    persInput.addEventListener('input', () => {
      const val = persInput.value.trim();
      if (val.length > 0 && selectedPers.size < MAX_PERS && !selectedPers.has(val)) {
        selectedPers.add(val);
      } else if (val.length === 0 || selectedPers.has(val)) {
        selectedPers.delete(val);
      }
      submitBtn.disabled = !(selectedJob && selectedPers.size > 0);
    });
  }

  // 다음 버튼 클릭 시 이동
  submitBtn.addEventListener('click', () => {
    if (!submitBtn.disabled) {
      window.location.href = 'resumemade3.html';
    }
  });
});



// 📦 Daum 주소 검색 함수
function searchAddress() {
  new daum.Postcode({
    oncomplete: function(data) {
      // 주소, 우편번호 자동 입력
      document.getElementById('address').value = data.roadAddress || data.jibunAddress;
      document.getElementById('postalCode').value = data.zonecode;
    }
  }).open();
}

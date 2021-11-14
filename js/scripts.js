"use strict";

// Модальное окно
$(function () {
  $("#callback-button").click(function (e) {
    e.preventDefault();
    $(".modal").addClass("modal_active");
    $("body").addClass("hidden");
  });

  $(".modal__close-button").click(function (e) {
    e.preventDefault();
    $(".modal").removeClass("modal_active");
    $("body").removeClass("hidden");
  });

  $(".modal").mouseup(function (e) {
    let modalContent = $(".modal__content");
    if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
      $(this).removeClass("modal_active");
      $("body").removeClass("hidden");
    }
  });
});

// форма

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add('_sending');
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        // получаем ответ
        let result = await response.json();
        // 
        alert(result.message);
        //чистим форму
        formPreview.innerHTML = '';
        form.reset();
        form.classList.remove('_sending');
      }else{
        alert('Ошибка');
        form.classList.remove('_sending');
      }
    } else {
      alert("Заполните обязательные поля");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");
    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];

      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  // добавляем класс _erorr родителю и дочернему элементу
  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  // удаляем класс _erorr родителю и дочернему элементу
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  // функция теста email
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});

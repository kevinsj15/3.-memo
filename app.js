// ページが読み込まれたときの処理
window.onload = function () {
  // HTML要素を取得
  console.log("JavaScript file is loaded correctly.");
  const noteArea = document.getElementById("noteArea");
  const saveButton = document.getElementById("saveButton");
  const templateSelect = document.getElementById("templateSelect");
  const newTemplateButton = document.getElementById("newTemplateButton");
  const achievementInput = document.getElementById("achievementInput");
  const achievementButton = document.getElementById("achievementButton");
  const achievementTable = document.getElementById("achievementTable");
  const noteList = document.getElementById("noteList");
  const popup = document.getElementById("popup");
  const noteContent = document.getElementById("noteContent");
  const closePopup = document.getElementById("closePopup");

  // ローカルストレージから保存されたノートとテンプレートを読み込む
  const savedNote = localStorage.getItem("note");
  const savedTemplates = JSON.parse(localStorage.getItem("templates")) || [];
  const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  // 保存されたノートがあればテキストエリアに読み込む
  if (savedNote) {
    noteArea.value = savedNote;
  }

  // ドロップダウンリストに保存されたテンプレートを読み込む
  savedTemplates.forEach((template, index) => {
    // テンプレートごとに新しいoption要素を作成
    const option = document.createElement("option");
    option.value = index;
    option.textContent = template.substring(0, 10) + "...";
    // テンプレートの最初の10文字を表示
    templateSelect.appendChild(option);
    // optionをドロップダウンリストに追加
  });

  // テンプレートが選択されたときのイベントリスナー
  templateSelect.addEventListener("change", function () {
    // テンプレートが選択されたらテキストエリアに読み込む
    noteArea.value = savedTemplates[this.value];
  });

  // 新しいテンプレートを作成するボタンのイベントリスナー
  newTemplateButton.addEventListener("click", function () {
    // 新しいテンプレートボタンがクリックされたら、現在のノートをテンプレートとして保存
    savedTemplates.push(noteArea.value);
    localStorage.setItem("templates", JSON.stringify(savedTemplates));

    // 新しいテンプレートをドロップダウンリストに追加
    const option = document.createElement("option");
    option.value = savedTemplates.length - 1;
    option.textContent = noteArea.value.substring(0, 10) + "...";
    templateSelect.appendChild(option);
  });

  // ノートを保存するボタンのイベントリスナー
  saveButton.addEventListener("click", function () {
    // ノートを保存するボタンがクリックされたら、現在のノートを保存
    localStorage.setItem("note", noteArea.value);

    // ノートを保存する際に日付も一緒に保存
    const date = new Date().toISOString().slice(0, 10);
    notes.push({
      date: date,
      content: noteArea.value,
    });
    localStorage.setItem("notes", JSON.stringify(notes));

    // リストに新しいノートを追加
    const li = document.createElement("li");
    li.textContent = date;
    li.addEventListener("click", function () {
      console.log("Before clicking note: ", popup.classList);
      noteContent.textContent = notes[notes.length - 1].content;
      popup.classList.remove("hidden");
      console.log("After clicking note: ", popup.classList);
    });
    noteList.appendChild(li);
  });

  // テーブルに達成事項を追加
  achievements.forEach((achievement) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${achievement.date}</td><td>${achievement.text}</td>`;
    achievementTable.appendChild(tr);
  });

  // 達成事項を追加するボタンのイベントリスナー
  achievementButton.addEventListener("click", function () {
    // 日付を取得
    const date = new Date().toISOString().slice(0, 10);
    // 達成事項を追加
    achievements.push({
      date: date,
      text: achievementInput.value,
    });
    localStorage.setItem("achievements", JSON.stringify(achievements));

    // テーブルに達成事項を追加
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${date}</td><td>${achievementInput.value}</td>`;
    achievementTable.appendChild(tr);
    // 入力フィールドを空にする
    achievementInput.value = "";
  });

  // リストにノートを追加
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.textContent = note.date;
    li.addEventListener("click", function () {
      // ノートをクリックしたらポップアップを表示
      noteContent.textContent = note.content;
      popup.classList.remove("hidden");
    });
    noteList.appendChild(li);
  });

  // ポップアップを閉じるボタンのイベントリスナー
  closePopup.addEventListener("click", function () {
    console.log("Before clicking: ", popup.classList);
    popup.classList.add("hidden");
    console.log("After clicking: ", popup.classList);
  });
};

//
$(function () {
  var marqueeScroll = function (id1, id2, id3, timer) {
    var $parent = $("#" + id1);
    var $goal = $("#" + id2);
    var $closegoal = $("#" + id3);
    $closegoal.html($goal.html());
    function Marquee() {
      if (parseInt($parent.scrollLeft()) - $closegoal.width() >= 0) {
        $parent.scrollLeft(parseInt($parent.scrollLeft()) - $goal.width());
      } else {
        $parent.scrollLeft($parent.scrollLeft() + 1);
      }
    }

    setInterval(Marquee, timer);
  };
  var marqueeScroll1 = new marqueeScroll(
    "marquee-box",
    "wave-list-box1",
    "wave-list-box2",
    20
  );
  var marqueeScroll2 = new marqueeScroll(
    "marquee-box3",
    "wave-list-box4",
    "wave-list-box5",
    40
  );
});

// ライトモード・ダークモードの実装
document.querySelector(".checkbox").addEventListener("change", function () {
  if (this.checked) {
    // チェックボックスがチェックされている場合、ダークモードに切り替え
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
  } else {
    // チェックボックスがチェックされていない場合、ライトモードに切り替え
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
  }
});

document.getElementById("saveButton").addEventListener("click", function () {
  document.getElementById("savePopup").style.display = "block";
});

document
  .getElementsByClassName("close-button")[0]
  .addEventListener("click", function () {
    document.getElementById("savePopup").style.display = "none";
  });

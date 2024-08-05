function showTooltip(event, text) {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'block';
    tooltip.style.left = event.pageX + 'px';
    tooltip.style.top = event.pageY + 'px';
    tooltip.innerHTML = text;
}

document.addEventListener('click', function(event) {
    const tooltip = document.getElementById('tooltip');
    if (!event.target.matches('.info-button')) {
        tooltip.style.display = 'none';
    }
});

document.getElementById('soccer-rate').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 막습니다.

    const requiredFields = ['height', 'weight', 'speed', 'jumping-height', 'long-jump', 'avg-goals', 'avg-assists', 'avg-shots', 'avg-win-striker', 'avg-pass-accuracy'];
    let allFieldsFilled = true;

    const maxValues = {
        'height': 200, // cm
        'weight': 100, // kg
        'speed': 10, // m/s
        'jumping-height': 100, // cm
        'long-jump': 8, // m
        'avg-goals': 2, // per game
        'avg-assists': 3, // per game
        'avg-shots': 5, // per game
        'avg-win-striker': 20, // per game
        'avg-pass-accuracy': 100 // percentage
    };

    let score = 0;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    requiredFields.forEach(function(field) {
        const element = document.querySelector(`[name="${field}"]`);
        if (element && element.value.trim()) {
            const value = parseFloat(element.value.trim());
            const maxValue = maxValues[field]; // 필드 이름과 maxValues 키가 일치
            score += (value / maxValue) * 10;
            data[field] = value;
            // 디버깅 출력
            console.log(`Field: ${field}, Value: ${value}, Score: ${(value / maxValue) * 10}`);
        } else {
            allFieldsFilled = false;
            console.log(`Field: ${field} is empty`);
        }
    });

    const position = document.querySelector('input[name="position"]:checked');
    if (!position) {
        allFieldsFilled = false;
        console.log('Position is not selected');
    } else {
        data.position = position.value;
    }

    if (allFieldsFilled) {
        score = Math.min(score, 100); // 점수는 최대 100을 넘지 않습니다.
        data.score = score.toFixed(2);
        alert(`Your score is: ${score.toFixed(2)} out of 100`);
        const params = new URLSearchParams(data).toString();
        window.location.href = `soccerresult.html?${params}`; // 모든 필드가 채워지면 다음 페이지로 이동
    } else {
        alert('All fields are required.');
    }
});


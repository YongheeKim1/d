document.getElementById('personal-info-form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const selectedSport = document.querySelector('input[name="sport"]:checked').value;

    switch (selectedSport) {
        case 'baseball':
            window.location.href = 'baseball.html';
            break;
        case 'basketball':
            window.location.href = 'basketball.html';
            break;
        case 'soccer':
            window.location.href = 'soccer.html';
            break;
        case 'tennis':
            window.location.href = 'tennis.html';
            break;
        case 'swimming':
            window.location.href = 'swimming.html';
            break;
        default:
            alert('Please select a sport.');
    }
});
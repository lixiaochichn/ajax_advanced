
document.addEventListener('DOMContentLoaded', function () {

    let $list = document.querySelector('.list');

    $.ajax({
        url: 'https://fe13.now.sh/api/posts',
        method: 'GET',
        success: function (json) {
            for (let i = 0; i < json.data.length; i++) {
                let html = `<div class="title"><a href="${json.data[i].url}">${json.data[i].title}</a></div><div class="delete" data-id="${json.data[i]._id}">Χ删除</div><div class="dian" data-id="${json.data[i]._id}">Δ点赞</div><div class="score">${json.data[i].score}赞</div><div class="type">${json.data[i].type}</div><div class="type">${json.data[i].text}</div>`;
                $list.innerHTML += html.substring(0);
            }
            // console.log(json.data);
        }
    })

    $(document).on('click', '.dian', function (event) {
        let $target = $(event.target);
        if ($target.data('voting')) return;
        $.ajax({
            url: `https://fe13.now.sh/api/posts/${$target.data('id')}/upvote`,
            method: 'PUT',
            success: function (data) {
                $target.next().html(data.score + '赞');
            }
        });
    });

    $(document).on('click', '.delete', function (event) {
        let $target = $(event.target);
        console.log('a');
        $.ajax({
            url: `https://fe13.now.sh/api/posts/${$target.data('id')}`,      
            method: 'DELETE',
            success: function () {
                location.reload();
            }
        });
    });




})
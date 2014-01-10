var rad = Math.PI / 180;
    Raphael.fn.sector = function (cx, cy, r, startAngle, endAngle, params) {
            var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }

    var size=700
    var radius = ( size - .03*size ) / 2.2
    var plus = size / 2 + .015*size
    var minus = size / 2 - .015*size
    

    var paper = Raphael(document.getElementById("circles"), 1000, size);


    var top_right = paper.set();
    var top_left = paper.set();
    var bottom_left = paper.set();
    var bottom_right = paper.set();
    var circle = paper.set()
    
    top_right.push (paper.sector(plus, minus, radius, 0, 90, {"fill": "#602bab", "stroke": "none"}) )
    top_left.push ( paper.sector(minus, minus, radius, 90, 180, {"fill": "#fdb800", "stroke": "none"}) )
    bottom_left.push ( paper.sector(minus, plus, radius, 180, 270, {"fill": "#187fcb", "stroke": "none"}) )
    bottom_right.push ( paper.sector(plus, plus, radius, 270, 0, {"fill": "#ff0064", "stroke": "none"}) )
    circle.push(top_right, top_left, bottom_left, bottom_right)

    expand = function (e) {
          cx = e.getPath()[0].attrs.path[0][1]
          cy = e.getPath()[0].attrs.path[0][2]
          k = 1.1
        e.stop().animate({transform: "s " + k + " " + k + " " + cx + " " + cy}, 300, "<>");
        //txt.stop().animate({opacity: 1}, 300, "<>");
      }
    contract = function (e) {
          e.stop().animate({transform: ""}, 300, "<>");
        //txt.stop().animate({opacity: 0}, 300);
      }

    relink_all = function () {circle.forEach(function(e){
          e.mouseover(function () {
              expand(e)
            //txt.stop().animate({opacity: 1}, 300, "<>");
          }).mouseout(function () {
              contract(e)
            //txt.stop().animate({opacity: 0}, 300);
          })
        })
    }
    relink_all()

     selected = false;

    test_of = function (e) {
        switch (e)
        {
            case top_right:
                return "eye"
                break
            case top_left:
                return "pet"
                break
            case bottom_right:
                return "genes"
                break
            case bottom_left:
                return "blood"
                break
        }
    }

   cycle = function() {
        if (selected) {
            cycle_list = [top_left,bottom_left,bottom_right,top_right]
            select(cycle_list[(selected[0].id)%4])
        }
        else {
            select(top_left)
        }
    }

    cycling = true

    start_cycle = function () {
            cycling = true
            setInterval(cycle, 3000)
    }
    //start_cycle()

    select = function (winner) {
        if (selected != winner) {
            $('#starter').css("display", "none")
            relink_all()
            circle.forEach(function(e){
                contract(e)
                $("#"+test_of(e)).css("display", "none")
            })
            expand(winner)
            $("#"+test_of(winner)).css("display", "block")
            winner.unmouseout()
            selected = winner
        }
        else {
            circle.forEach(function(e){
                contract(e)
                $("#"+test_of(e)).css("display", "none")
            })
            relink_all()
            selected = false
             $('#starter').css("display", "block")
            //if (! cycling) {start_cycle()}
            //throw new Error("linked")
        }
    }

    circle.forEach(function(quarter){
        quarter.click(function() {select(quarter); //clearInterval(start_cycle()); cycling = false
        })
    })

    //select(top_left);

    $('#eye_label').click(function() {select(top_right)}).hover(function() {expand(top_right)}, function() {contract(top_right)})
    $('#blood_label').click(function() {select(bottom_left)}).hover(function() {expand(bottom_left)}, function() {contract(bottom_left)})
    $('#pet_label').click(function() {select(top_left)}).hover(function() {expand(top_left)}, function() {contract(top_left)})
    $('#genes_label').click(function() {select(bottom_right)}).hover(function() {expand(bottom_right)}, function() {contract(bottom_right)})





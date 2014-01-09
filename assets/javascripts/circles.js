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
    

    var paper = Raphael(document.getElementById("circles"), size, size);


    var top_right = paper.set();
    var top_left = paper.set();
    var bottom_left = paper.set();
    var bottom_right = paper.set();
    var circle = paper.set()
    
    top_right.push (paper.sector(plus, minus, radius, 0, 90, {"fill": "red", "stroke": "none"}) )
    top_left.push ( paper.sector(minus, minus, radius, 90, 180, {"fill": "green", "stroke": "none"}) )
    bottom_left.push ( paper.sector(minus, plus, radius, 180, 270, {"fill": "blue", "stroke": "none"}) )
    bottom_right.push ( paper.sector(plus, plus, radius, 270, 0, {"fill": "purple", "stroke": "none"}) )
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

    circle.forEach(function(e){
      e.mouseover(function () {
          expand(e)
        //txt.stop().animate({opacity: 1}, 300, "<>");
      }).mouseout(function () {
          contract(e)
        //txt.stop().animate({opacity: 0}, 300);
      })
    })

    var selected;

    top_right.click(function () {
        if (selected != top)
        $("#starter").css("display", "none")
        $("#ocular").css("display", "block")
        top_right.unmouseout()
        expand(top_right)
        selected = top_right
    })
class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let numCurves = this.num_curve_sections;
        this.drawBezierCurve(
            {x:100, y:100}, 
            {x:100, y:200}, 
            {x:200, y:200}, 
            {x:200, y:100}, 
            numCurves, [0,0,255,255], framebuffer);
        this.drawBezierCurve(
            {x:400, y:200}, 
            {x:500, y:200}, 
            {x:450, y:650}, 
            {x:400, y:400}, 
            numCurves, [255,0,0,255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let numCurves = this.num_curve_sections;

        this.drawCircle({x: 300, y:450}, 100, numCurves, [0,0,255,255], framebuffer);
        this.drawCircle({x: 575, y:275}, 200, numCurves, [100,0,0,255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        
        let verticesTeal = [{x: 400, y: 125},{x: 550, y: 200},{x: 600, y: 250},{x: 650, y: 360},{x: 525, y: 450},
                        {x: 425, y: 450},{x: 240, y: 360},{x: 200, y: 60}];
        this.drawConvexPolygon(verticesTeal, [0,150,150,255], framebuffer);

        let verticesYellow = [{x: 100, y: 575},{x: 50, y: 550},{x: 75, y: 500},{x: 200, y: 400},{x: 250, y: 425},
                        {x: 350, y: 500},{x: 375, y: 550},{x: 250, y: 590}];
        this.drawConvexPolygon(verticesYellow, [150,150,0,255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let blue = [0,100,255,255];
        let black = [0,0,0,255];
        let numCurves = this.num_curve_sections

        // ** A ** //
        this.drawLine({x:50, y:75}, {x:100, y:200}, blue, framebuffer);
        this.drawLine({x:100, y:200}, {x:150, y:75}, blue, framebuffer);
        this.drawConvexPolygon([{x:100, y:200}, {x: 70, y:125}, {x:130, y:125}], blue, framebuffer);

        // ** n ** //
        this.drawBezierCurve({x:175, y:75}, {x:175, y:150}, {x:250, y:150}, {x:250, y:70}, numCurves, blue, framebuffer);
    
        // ** d ** //
        this.drawCircle({x:305, y:105}, 30, numCurves, blue, framebuffer);
        this.drawLine({x:335, y:75}, {x:335, y:200}, blue, framebuffer);

        // ** r ** //
        this.drawBezierCurve({x:375, y:75},{x:375, y:125},{x:415, y:125},{x:415, y:125},numCurves,blue,framebuffer);
        this.drawLine({x:375, y:75},{x:375, y:125},blue,framebuffer);

        // ** e ** //
        this.drawBezierCurve({x:470, y:125}, {x:430, y:125}, {x:430, y:75}, {x:470, y:75}, numCurves, blue, framebuffer);
        this.drawBezierCurve({x:440, y:100}, {x:450, y:100}, {x:450, y:100}, {x:470, y:125}, numCurves, blue, framebuffer);

        // ** w ** //
        this.drawLine({x:500, y:125}, {x:510, y:75}, blue, framebuffer);
        this.drawLine({x:510, y:75}, {x:520, y:100}, blue, framebuffer);
        this.drawLine({x:520, y:100}, {x:530, y:75}, blue, framebuffer);
        this.drawLine({x:530, y:75}, {x:540, y:125}, blue, framebuffer);
        
        // point data handler for lines
        if(this.show_points){
            // A lines
            this.drawVertex({x:50, y:75}, black, framebuffer);
            this.drawVertex({x:150, y:75}, black, framebuffer);

            // d lines
            this.drawVertex({x:335, y:75}, black, framebuffer);
            this.drawVertex({x:335, y:200}, black, framebuffer);

            // r lines
            this.drawVertex({x:375, y:75}, black, framebuffer);
            this.drawVertex({x:375, y:125}, black, framebuffer);

            // w lines
            this.drawVertex({x:500, y:125}, black, framebuffer);
            this.drawVertex({x:510, y:75}, black, framebuffer);
            this.drawVertex({x:520, y:100}, black, framebuffer);
            this.drawVertex({x:530, y:75}, black, framebuffer);
            this.drawVertex({x:540, y:125}, black, framebuffer);
        }
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        //this.drawBezierCurve({x:100, y:100}, {x:100, y:200}, 
        //                     {x:200, y:200}, {x:200, y:100}, numCurves, [0,0,255,255], framebuffer);
        /*
        t=0.0 is the start, t=1.0 is the end
        for any point on the line: 
            x = ((1-t)^3) * P0x) + (3 * (1-t)^2 * t * P1x) + (3 * (1-t) * t^2 * P2x) + (t^3 * P3x)
            y = ((1-t)^3) * P0y) + (3 * (1-t)^2 * t * P1y) + (3 * (1-t) * t^2 * P2y) + (t^3 * P3y)
        */
        let tStep = 1.0 / num_edges;
        let t = 0.0;

        let midPoints = [];

        //loop to calculate all the points on the line
        while(t<1.0){
            let x = (((1-t)**3) * p0.x) + (3 * ((1-t)**2) * t * p1.x) + (3 * (1-t) * t**2 * p2.x) + (t**3 * p3.x);
            let y = (((1-t)**3) * p0.y) + (3 * ((1-t)**2) * t * p1.y) + (3 * (1-t) * t**2 * p2.y) + (t**3 * p3.y);
            x = Math.trunc(x);
            y = Math.trunc(y);
            midPoints.push({x: x, y: y});
            
            t += tStep;
        }
        
        //loop to draw all the lines
        let i = 0;
        let k = 1;
        for(i; i<num_edges; i++){
            if(i==num_edges-1){
                k = i;
            }
            
            let p01Temp = midPoints[i];
            let p02Temp = midPoints[k];

            var start = {x: p01Temp.x, y: p01Temp.y};
            var end = {x: p02Temp.x, y: p02Temp.y};

            this.drawLine(start, end, color, framebuffer);

            k+=1;

            //show points functionality
            if(this.show_points){
                if(this.show_points){
                    this.drawVertex(start, [0,0,0,255], framebuffer);
                }
            }
        }
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle

        let phiStep = 360/num_edges;
        let currAngle = 0;

        // x = centerX + radius(cos(phi))
        // y = centerY + radius(sin(phi))

        let midPoints = [];

        //loop to find all the vertiecs and put em in midPoints
        while(currAngle < 360){
            let tempX = center.x + (radius*(Math.cos(currAngle * Math.PI / 180)));
            let tempY = center.y + (radius*(Math.sin(currAngle * Math.PI / 180)));
            tempX = Math.trunc(tempX);
            tempY = Math.trunc(tempY);

            midPoints.push({x: tempX, y: tempY});

            currAngle += phiStep;
        }

        // loop to draw the lines, connecting the vertices in midPoints
        let i = 0
        let k = 1
        for(i; i<num_edges; i++){
            if(i == num_edges-1){
                k = 0
            }

            let p01Temp = midPoints[i];
            let p02Temp = midPoints[k];

            var start = {x: p01Temp.x, y: p01Temp.y};
            var end = {x: p02Temp.x, y: p02Temp.y};

            this.drawLine(start, end, color, framebuffer);

            k+=1;

            //show points functionality
            if(this.show_points){
                this.drawVertex(start, [0,0,0,255], framebuffer);
            }
        }
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        
        // Vertex 0 is our origin point. Why? Because why not, we had to choose one
        let count = 0;
        // loop to draw all the triangles
        while(count<vertex_list.length-2){
            this.drawTriangle(vertex_list[0], vertex_list[count+1], vertex_list[count+2], color, framebuffer);
            if(this.show_points){
                this.drawVertex(vertex_list[count], [0,0,0,255], framebuffer);
                
                // This handles getting to the end of the loop with two undrawn vertices
                if(count+1 == vertex_list.length-2){
                    count+=1;
                    this.drawVertex(vertex_list[count], [0,0,0,255], framebuffer);
                    count+=1;
                    this.drawVertex(vertex_list[count], [0,0,0,255], framebuffer);
                }
            }
            count+=1;
        }
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        this.drawLine(
            {x: v.x-5, y: v.y}, 
            {x: v.x+5, y: v.y}, 
            color, framebuffer);
        this.drawLine(
            {x: v.x, y: v.y-5}, 
            {x: v.x, y: v.y+5}, 
            color, framebuffer);
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(framebuffer, px, color) {
	    framebuffer.data[px + 0] = color[0];
	    framebuffer.data[px + 1] = color[1];
	    framebuffer.data[px + 2] = color[2];
	    framebuffer.data[px + 3] = color[3];
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                        // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }

    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1;
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (x <= x1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            x += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                y += iy;
            }
        }
    }

    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1;
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let x = x0;
        let y = y0;
        let px;
        while (y <= y1)
        {
            px = this.pixelIndex(x, y, framebuffer);
            this.setFramebufferColor(framebuffer, px, color);
            y += 1;
            if (D <= 0)
            {
                D += 2 * A;
            }
            else
            {
                D += 2 * A + 2 * B;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy input points
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        
        // Sort points in ascending y order
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

import { Component, OnInit } from "@angular/core";

import * as cp from 'child_process';

@Component({
    selector: 'quickbar',
    templateUrl: './quickbar.component.html'
})
export class QuickbarComponent implements OnInit{
    
    ngOnInit(): void {
        this.onPlay();
    }

    onPlay(){
        let child = cp.spawn('node ' + './test.js');
        child.stdout.on('data', function(data) {
            console.log('stdout: ' + data);
            //Here is where the output goes
        });
        child.stderr.on('data', function(data) {
            console.log('stderr: ' + data);
            //Here is where the error output goes
        });
        child.on('close', function(code) {
            console.log('closing code: ' + code);
            //Here you can get the exit code of the script
        });
    }
}
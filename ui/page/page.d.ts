import { OnInit, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/common';
export interface IAttribute {
    [name: string]: any;
}
export interface IPaginationConfig extends IAttribute {
    maxSize: number;
    itemsPerPage: number;
    boundaryLinks: boolean;
    directionLinks: boolean;
    firstText: string;
    previousText: string;
    nextText: string;
    lastText: string;
    rotate: boolean;
}
export declare class Pagination implements ControlValueAccessor, OnInit, IPaginationConfig, IAttribute {
    cd: NgModel;
    renderer: Renderer;
    elementRef: ElementRef;
    maxSize: number;
    boundaryLinks: boolean;
    directionLinks: boolean;
    firstText: string;
    previousText: string;
    nextText: string;
    lastText: string;
    rotate: boolean;
    private disabled;
    private numPages;
    private pageChanged;
    itemsPerPage: number;
    private totalItems;
    config: any;
    private classMap;
    private _itemsPerPage;
    private _totalItems;
    private _totalPages;
    private inited;
    private totalPages;
    page: number;
    private _page;
    private pages;
    constructor(cd: NgModel, renderer: Renderer, elementRef: ElementRef);
    ngOnInit(): void;
    writeValue(value: number): void;
    private selectPage(page, event?);
    private getText(key);
    private noPrevious();
    private noNext();
    private makePage(number, text, isActive);
    private getPages(currentPage, totalPages);
    private calculateTotalPages();
    onChange: (_: any) => void;
    onTouched: () => void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
}
export declare class Pager extends Pagination implements OnInit {
    config: {
        itemsPerPage: number;
        previousText: string;
        nextText: string;
        align: boolean;
    };
    constructor(cd: NgModel, renderer: Renderer, elementRef: ElementRef);
}
export declare const PAGINATION_DIRECTIVES: Array<any>;

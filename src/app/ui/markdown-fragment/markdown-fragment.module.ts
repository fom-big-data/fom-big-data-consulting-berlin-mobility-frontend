import {NgModule} from '@angular/core';
import {MarkdownEditorComponent} from './markdown-editor/markdown-editor.component';
import {MarkdownPreviewComponent} from './markdown-preview/markdown-preview.component';
import {MarkdownFragmentImports} from './markdown-fragment.imports';
import {MarkdownFragmentDeclarations} from './markdown-fragment.declaration';
import {SafePipe} from './pipes/safe.pipe';

@NgModule({
  imports: [MarkdownFragmentImports],
  declarations: [MarkdownFragmentDeclarations, SafePipe],
  entryComponents: [
    MarkdownEditorComponent,
    MarkdownPreviewComponent
  ],
  exports: [
    MarkdownEditorComponent,
    MarkdownPreviewComponent
  ]
})
export class MarkdownFragmentModule {
}

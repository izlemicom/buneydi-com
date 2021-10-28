import { useState, useRef, useEffect } from "react";

function ArticleTextEditor() {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5"),
    };
    setEditorLoaded(true);
  }, []);

  const [data, setData] = useState("");

  return (
    <div className="flex flex-col my-2">
      {editorLoaded ? (
        <CKEditor
          config={{
            toolbar: {
              items: [
                "heading",
                "|",
                "link",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "numberedList",
                "bulletedList",
                "todoList",
                "insertTable",
                "|",
                "indent",
                "outdent",
                "alignment",
                "|",
                "blockQuote",
                "horizontalLine",
                "fontColor",
                "fontBackgroundColor",
                "highlight",
                "|",
                "undo",
                "redo",
              ],
              shouldNotGroupWhenFull: true,
            },
            language: "tr",
            image: {
              toolbar: [
                "imageTextAlternative",
                "imageStyle:inline",
                "imageStyle:block",
                "imageStyle:side",
              ],
            },
            table: {
              contentToolbar: [
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "tableCellProperties",
                "tableProperties",
              ],
            },
            licenseKey: "",
          }}
          editor={ClassicEditor}
          data={data}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "height",
                "300px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setData(data);
            console.log(data);
          }}
        />
      ) : (
        <p>Yükleniyor...</p>
      )}
      <div>
        <article
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: data }}
        ></article>
      </div>
    </div>
  );
}

export default ArticleTextEditor;

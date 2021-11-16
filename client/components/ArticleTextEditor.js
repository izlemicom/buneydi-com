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
                "|",
                "heading",
                "|",
                "link",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "|",
                "numberedList",
                "bulletedList",
                "todoList",
                "insertTable",
                "|",
                "specialCharacters",
                "superscript",
                "subscript",
                "code",
                "codeBlock",
                "|",
                "blockQuote",
                "horizontalLine",
                "indent",
                "outdent",
                "alignment",
                "|",
                "fontColor",
                "fontBackgroundColor",
                "highlight",
                "|",
                "imageInsert",
                "mediaEmbed",
                "|",
                "undo",
                "redo",
                "|",
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
                "linkImage",
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
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setData(data);
          }}
        />
      ) : (
        <p>Yükleniyor...</p>
      )}
      <div>
        <article
          className="prose-lg"
          dangerouslySetInnerHTML={{ __html: data }}
        ></article>
      </div>
    </div>
  );
}

export default ArticleTextEditor;

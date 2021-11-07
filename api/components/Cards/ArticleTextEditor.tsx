import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { articleData } from "../../atoms/recoil";

function ArticleTextEditor({ initData }) {
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

  const [data, setData] = useRecoilState(articleData);

  return (
    <div className="flex flex-col my-2">
      {editorLoaded ? (
        <CKEditor
          config={{
            simpleUpload: {
              // The URL that the images are uploaded to.
              uploadUrl: "./api/image/image",

              // Enable the XMLHttpRequest.withCredentials property.
              //withCredentials: false,

              // Headers sent along with the XMLHttpRequest to the upload server.
              //headers: {
              //"X-File-Name": "img",
              //Authorization: "Bearer <JSON Web Token>",
              // },
            },
            licenseKey: "",
          }}
          editor={ClassicEditor}
          data={initData}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "min-height",
                "300px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log(data);
            setData(data);
          }}
        />
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
}

export default ArticleTextEditor;

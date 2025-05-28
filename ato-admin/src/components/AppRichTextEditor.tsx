import {
  LinkBubbleMenu,
  LinkBubbleMenuHandler,
  MenuButtonAlignCenter,
  MenuButtonAlignLeft,
  MenuButtonAlignRight,
  MenuButtonBlockquote,
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonEditLink,
  MenuButtonHorizontalRule,
  MenuButtonItalic,
  MenuButtonOrderedList,
  MenuButtonStrikethrough,
  MenuButtonTextColor,
  MenuButtonUnderline,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField
} from 'mui-tiptap';

import { Stack, Typography } from '@mui/material';
import ColorKit from '@tiptap/extension-color';
import ImageKit from '@tiptap/extension-image';
import LinkHandlerKit from '@tiptap/extension-link';
import StrikeThroughKit from '@tiptap/extension-strike';
import TextAlignKit from '@tiptap/extension-text-align';
import StyleKit from '@tiptap/extension-text-style';
import UnderlineKit from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

export interface IRichTextEditorProps {
  label: string;
  handleChange: (value: string | undefined) => void;
  value?: string;
  error?: boolean;
  helperText?: string;
}

const AppRichTextEditor = ({ value, label, error, helperText, handleChange = () => {} }: IRichTextEditorProps) => {
  const editor = useEditor({
    content: value,
    extensions: [
      StarterKit,
      StyleKit,
      ColorKit,
      TextAlignKit,
      UnderlineKit,
      LinkHandlerKit,
      LinkBubbleMenuHandler,
      ImageKit,
      StrikeThroughKit
    ]
  });

  const richTextValue = editor?.getHTML();

  useEffect(() => {
    handleChange(richTextValue);
  }, [richTextValue]);

  return (
    <Stack gap={1}>
      <Typography fontWeight={'bold'}>{label}</Typography>
      <RichTextEditorProvider editor={editor}>
        <RichTextField
          variant="outlined"
          controls={
            <MenuControlsContainer>
              <MenuSelectHeading tooltipTitle="Chọn tiêu đề" />
              <MenuDivider />
              <MenuButtonBold tooltipLabel="Chữ đậm" />
              <MenuButtonItalic tooltipLabel="Chữ nghiêng" />
              <MenuButtonUnderline tooltipLabel="Chữ gạch dưới" />
              <MenuButtonAlignLeft tooltipLabel="Căn lề trái" />
              <MenuButtonAlignCenter tooltipLabel="Căn lề giữa" />
              <MenuButtonAlignRight tooltipLabel="Căn lề phải" />
              <MenuButtonTextColor tooltipLabel="Màu chữ" />
              <MenuButtonBulletedList tooltipLabel="Danh sách dấu chấm" />
              <MenuButtonOrderedList tooltipLabel="Danh sách đánh số" />
              <LinkBubbleMenu
                labels={{
                  editLinkAddTitle: 'Chèn đường dẫn',
                  editLinkEditTitle: 'Chỉnh sửa đường dẫn',
                  editLinkCancelButtonLabel: 'Hủy',
                  editLinkSaveButtonLabel: 'Lưu',
                  editLinkHrefInputLabel: 'Đường dẫn',
                  editLinkTextInputLabel: 'Tiêu đề',
                  viewLinkRemoveButtonLabel: 'Xóa',
                  viewLinkEditButtonLabel: 'Chỉnh sửa'
                }}
              />
              <MenuButtonEditLink tooltipLabel="Chèn đường dẫn" />
              <MenuButtonBlockquote tooltipLabel="Đoạn trích dẫn" />
              <MenuButtonStrikethrough tooltipLabel="Gạch bỏ chữ" />
              <MenuButtonHorizontalRule tooltipLabel="Chèn đường kẻ ngang" />
            </MenuControlsContainer>
          }
        />
      </RichTextEditorProvider>

      {error && <Typography color={'red'}>{helperText}</Typography>}
    </Stack>
  );
};

export default AppRichTextEditor;

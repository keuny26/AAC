import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Shortcut } from '../stores/shortcutStore';
import { useShortcutStore } from '../stores/shortcutStore';

const emojiOptions = ['💊', '💧', '🚽', '🍚', '😣', '🏠', '📱', '❤️', '👍', '👎', '🙏', '😴'];

export default function Shortcuts() {
  const navigate = useNavigate();
  const { shortcuts, addShortcut, removeShortcut, updateShortcut } = useShortcutStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const [newEmoji, setNewEmoji] = useState('💬');

  const handleAdd = () => {
    if (!newLabel.trim()) return;
    addShortcut({ label: newLabel.trim(), emoji: newEmoji });
    setNewLabel('');
    setNewEmoji('💬');
    setIsAdding(false);
  };

  const handleUpdate = (id: string) => {
    if (!newLabel.trim()) return;
    updateShortcut(id, { label: newLabel.trim(), emoji: newEmoji });
    setNewLabel('');
    setNewEmoji('💬');
    setEditingId(null);
  };

  const startEdit = (shortcut: Shortcut) => {
    setEditingId(shortcut.id);
    setNewLabel(shortcut.label);
    setNewEmoji(shortcut.emoji);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setNewLabel('');
    setNewEmoji('💬');
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center border-b border-gray-100">
        <button
          onClick={() => navigate('/settings')}
          className="text-2xl text-gray-600 mr-4"
        >
          ←
        </button>
        <h1 className="text-xl font-bold text-gray-800">나만의 단축어</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Info */}
        <p className="text-sm text-gray-500 mb-4">
          자주 쓰는 표현을 최대 12개까지 등록할 수 있어요 ({shortcuts.length}/12)
        </p>

        {/* Shortcut List */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {shortcuts.map((shortcut) => (
            <div key={shortcut.id}>
              {editingId === shortcut.id ? (
                <div className="p-4 border-b border-gray-100">
                  {/* Edit Mode */}
                  <div className="flex gap-2 mb-3">
                    <span className="text-2xl">{newEmoji}</span>
                    <input
                      type="text"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                      placeholder="문구를 입력하세요"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {emojiOptions.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setNewEmoji(emoji)}
                        className={`w-10 h-10 rounded-lg text-xl ${
                          newEmoji === emoji ? 'bg-primary/20 ring-2 ring-primary' : 'bg-gray-100'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={cancelEdit}
                      className="flex-1 py-2 bg-gray-200 rounded-lg font-medium"
                    >
                      취소
                    </button>
                    <button
                      onClick={() => handleUpdate(shortcut.id)}
                      className="flex-1 py-2 bg-primary text-white rounded-lg font-medium"
                    >
                      저장
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 border-b border-gray-100 flex items-center">
                  <span className="text-2xl mr-3">{shortcut.emoji}</span>
                  <span className="flex-1 font-medium">{shortcut.label}</span>
                  <button
                    onClick={() => startEdit(shortcut)}
                    className="w-8 h-8 text-gray-400 mr-2"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => removeShortcut(shortcut.id)}
                    className="w-8 h-8 text-gray-400"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add New */}
          {isAdding ? (
            <div className="p-4">
              <div className="flex gap-2 mb-3">
                <span className="text-2xl">{newEmoji}</span>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="문구를 입력하세요"
                  autoFocus
                />
              </div>
              <div className="flex gap-2 mb-3 flex-wrap">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setNewEmoji(emoji)}
                    className={`w-10 h-10 rounded-lg text-xl ${
                      newEmoji === emoji ? 'bg-primary/20 ring-2 ring-primary' : 'bg-gray-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={cancelEdit}
                  className="flex-1 py-2 bg-gray-200 rounded-lg font-medium"
                >
                  취소
                </button>
                <button
                  onClick={handleAdd}
                  className="flex-1 py-2 bg-primary text-white rounded-lg font-medium"
                >
                  추가
                </button>
              </div>
            </div>
          ) : (
            shortcuts.length < 12 && (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full p-4 border-2 border-dashed border-gray-200 text-gray-500 font-medium"
              >
                + 단축어 추가
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  MdCheck,
  MdDragIndicator,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdLink,
  MdOpenInNew,
  MdRefresh,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useMenuStore } from "../../store/menu/menuStore";
import { cardClass, sectionTitleClass } from "./projects/projectFormUi";

const itemTypeClass = {
  static: "border-sky-100 bg-sky-50 text-sky-700",
  concern: "border-emerald-100 bg-emerald-50 text-emerald-700",
};

const getItemId = (item) => item?._id || item?.key;

const reorderItems = (items, fromId, toId) => {
  if (!fromId || !toId || fromId === toId) return items;

  const fromIndex = items.findIndex((item) => getItemId(item) === fromId);
  const toIndex = items.findIndex((item) => getItemId(item) === toId);

  if (fromIndex < 0 || toIndex < 0) return items;

  const nextItems = [...items];
  const [movedItem] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, movedItem);
  return nextItems;
};

export default function MenuSettings() {
  const { concernMenuItems, isLoading, loadConcernMenuItems, saveConcernMenuItems } = useMenuStore();
  const [draftItems, setDraftItems] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadConcernMenuItems();
  }, [loadConcernMenuItems]);

  useEffect(() => {
    setDraftItems(concernMenuItems);
    setHasChanges(false);
  }, [concernMenuItems]);

  const markDraftItems = (items) => {
    setDraftItems(items);
    setHasChanges(true);
  };

  const saveItems = async () => {
    await saveConcernMenuItems(draftItems);
  };

  const moveItem = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= draftItems.length) return;

    const nextItems = [...draftItems];
    [nextItems[index], nextItems[nextIndex]] = [nextItems[nextIndex], nextItems[index]];
    markDraftItems(nextItems);
  };

  const toggleItem = (index) => {
    const nextItems = draftItems.map((item, itemIndex) =>
      itemIndex === index ? { ...item, isVisible: item.isVisible === false } : item
    );
    markDraftItems(nextItems);
  };

  const refreshMenu = async () => {
    await loadConcernMenuItems(true);
  };

  const resetDraft = () => {
    setDraftItems(concernMenuItems);
    setHasChanges(false);
    setDraggingId(null);
    setDragOverId(null);
  };

  const handleDragStart = (event, item) => {
    const itemId = getItemId(item);
    setDraggingId(itemId);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", itemId);
  };

  const handleDragOver = (event, item) => {
    event.preventDefault();
    const itemId = getItemId(item);
    if (itemId !== dragOverId) setDragOverId(itemId);
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event, item) => {
    event.preventDefault();
    const fromId = event.dataTransfer.getData("text/plain") || draggingId;
    const toId = getItemId(item);
    const nextItems = reorderItems(draftItems, fromId, toId);

    setDraggingId(null);
    setDragOverId(null);

    if (nextItems !== draftItems) markDraftItems(nextItems);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDragOverId(null);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className={`${cardClass} space-y-5`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={sectionTitleClass}>Navigation</p>
            <h2 className="text-2xl font-black text-slate-900">Our Concern Menu Order</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Arrange the public Our Concern menu and control which links stay visible.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {hasChanges ? (
              <button
                type="button"
                onClick={resetDraft}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Reset
              </button>
            ) : null}
            <button
              type="button"
              onClick={refreshMenu}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <MdRefresh size={18} />
              Refresh
            </button>
            <button
              type="button"
              onClick={saveItems}
              disabled={isLoading || !hasChanges}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <MdCheck size={18} />
              Save Menu
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {draftItems.map((item, index) => {
            const url = item.href || item.to || "";
            const hidden = item.isVisible === false;
            const itemId = getItemId(item);
            const isDragging = draggingId === itemId;
            const isDropTarget = dragOverId === itemId && draggingId !== itemId;

            return (
              <div
                key={itemId}
                draggable={!isLoading}
                onDragStart={(event) => handleDragStart(event, item)}
                onDragOver={(event) => handleDragOver(event, item)}
                onDrop={(event) => handleDrop(event, item)}
                onDragEnd={handleDragEnd}
                className={`flex flex-col gap-4 rounded-2xl border p-4 shadow-sm transition sm:flex-row sm:items-center ${
                  hidden ? "border-slate-200 bg-slate-50 opacity-70" : "border-slate-100 bg-white"
                } ${
                  isDragging ? "scale-[0.99] border-emerald-300 opacity-55 shadow-xl" : ""
                } ${
                  isDropTarget ? "border-emerald-400 bg-emerald-50 shadow-md ring-2 ring-emerald-100" : ""
                }`}
              >
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    title="Drag menu item"
                    className="flex h-10 w-10 cursor-grab items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700 active:cursor-grabbing"
                  >
                    <MdDragIndicator size={22} />
                  </button>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-black text-slate-600">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-black text-slate-900">{item.label}</h3>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${
                        itemTypeClass[item.source] || "border-slate-100 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {item.source || "menu"}
                    </span>
                    {hidden ? (
                      <span className="rounded-full border border-rose-100 bg-rose-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-rose-600">
                        Hidden
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-2 flex min-w-0 items-center gap-2 text-xs text-slate-500">
                    {item.external ? <MdOpenInNew size={15} /> : <MdLink size={15} />}
                    <span className="truncate">{url}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    title="Move up"
                    disabled={index === 0 || isLoading}
                    onClick={() => moveItem(index, -1)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-teal-100 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <MdKeyboardArrowUp size={24} />
                  </button>
                  <button
                    type="button"
                    title="Move down"
                    disabled={index === draftItems.length - 1 || isLoading}
                    onClick={() => moveItem(index, 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-teal-100 hover:text-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <MdKeyboardArrowDown size={24} />
                  </button>
                  <button
                    type="button"
                    title={hidden ? "Show in menu" : "Hide from menu"}
                    disabled={isLoading}
                    onClick={() => toggleItem(index)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      hidden
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "bg-rose-50 text-rose-600 hover:bg-rose-100"
                    }`}
                  >
                    {hidden ? <MdVisibility size={20} /> : <MdVisibilityOff size={20} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!draftItems.length && !isLoading ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            No menu items found.
          </div>
        ) : null}
      </section>
    </div>
  );
}

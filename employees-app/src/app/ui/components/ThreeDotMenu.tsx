// components/ThreeDotMenu.tsx
import { Fragment, ReactNode } from "react";
import {
    Menu,
    MenuSeparator,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export type MenuEntry =
    | {
          type?: "item" | "separator";
          id: string;
          label: string;
          icon?: ReactNode;
          shortcut?: string;
          href?: string;
          target?: "_blank" | "_self" | "_parent" | "_top";
          download?: boolean | string;
          onSelect?: () => void;
          disabled?: boolean;
          variant?: "default" | "danger";
      }
    | { type: "separator"; id: string };

export type ThreeDotMenuProps = {
    items: MenuEntry[];
    ariaLabel?: string;
    align?: "start" | "end";
    buttonClassName?: string;
    itemsClassName?: string;
    renderButton?: () => ReactNode;
};

export default function ThreeDotMenu({
    items,
    ariaLabel = "Open menu",
    align = "end",
    buttonClassName,
    itemsClassName,
    renderButton,
}: ThreeDotMenuProps) {
    const alignment =
        align === "end" ? "right-0 origin-top-right" : "left-0 origin-top-left";

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton
                    aria-label={ariaLabel}
                    className={clsx(
                        // trigger
                        "flex items-center rounded-full p-2 cursor-pointer",
                        "text-(--color-text) hover:text-(--color-text-hover)",
                        "hover:bg-(--color-disabled)",
                        "focus:outline-none",
                        buttonClassName
                    )}>
                    {renderButton ? (
                        renderButton()
                    ) : (
                        <EllipsisVerticalIcon className="h-5 w-5" />
                    )}
                </MenuButton>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <MenuItems
                    className={clsx(
                        // panel
                        "absolute z-50 mt-2 w-56 rounded-md shadow-lg focus:outline-none",
                        "bg-(--color-surface) border border-(--color-placeholder)",
                        alignment,
                        itemsClassName
                    )}>
                    <div className="py-1">
                        {items.map((it) => {
                            if (it.type === "separator") {
                                return (
                                    // <div
                                    //     key={it.id}
                                    //     className="my-1 border-t border-[var(--color-border)]"
                                    // />
                                    <MenuSeparator
                                        key={it.id}
                                        className="my-1 border-t border-(--color-border)"
                                    />
                                );
                            }

                            const {
                                id,
                                label,
                                icon,
                                shortcut,
                                href,
                                target,
                                download,
                                onSelect,
                                disabled,
                                variant,
                            } = it;

                            const baseItem =
                                // base shape + state styling via data attributes
                                "group flex w-full items-center gap-2 px-3 py-2 text-sm rounded-[6px] " +
                                "text-[var(--color-text)] " +
                                "data-[active]:bg-[var(--color-surface-hover)] " +
                                "data-[active]:text-[var(--color-text)] " +
                                "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed";

                            const variantClasses =
                                !disabled && variant === "danger"
                                    ? "text-[var(--color-danger)] " +
                                      "data-[active]:bg-[var(--color-error-bg)] " +
                                      "data-[active]:text-[var(--color-danger)]"
                                    : "";

                            // LINK ITEM
                            if (href) {
                                return (
                                    <MenuItem
                                        as="a"
                                        key={id}
                                        href={href}
                                        target={target}
                                        rel={
                                            target === "_blank"
                                                ? "noreferrer noopener"
                                                : undefined
                                        }
                                        download={download}
                                        disabled={disabled}
                                        className={clsx(
                                            baseItem,
                                            variantClasses
                                        )}>
                                        {icon && (
                                            <span className="shrink-0">
                                                {icon}
                                            </span>
                                        )}
                                        <span className="flex-1">{label}</span>
                                        {shortcut && (
                                            <kbd className="font-sans text-[11px] text-(--color-placeholder) group-data-active:text-(--color-text)">
                                                {shortcut}
                                            </kbd>
                                        )}
                                    </MenuItem>
                                );
                            }

                            // BUTTON ITEM
                            return (
                                <MenuItem
                                    as="button"
                                    type="button"
                                    key={id}
                                    onClick={() => !disabled && onSelect?.()}
                                    disabled={disabled}
                                    className={clsx(baseItem, variantClasses)}>
                                    {icon && (
                                        <span className="shrink-0">{icon}</span>
                                    )}
                                    <span className="flex-1">{label}</span>
                                    {shortcut && (
                                        <kbd className="font-sans text-[11px] text-(--color-placeholder) group-data-active:text-(--color-text)">
                                            {shortcut}
                                        </kbd>
                                    )}
                                </MenuItem>
                            );
                        })}
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    );
}

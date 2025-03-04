"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

  // Состояние для поиска
  const [searchQuery, setSearchQuery] = useState("");

  // Состояние для открытия/закрытия меню
  const [menuOpen, setMenuOpen] = useState(false);

  // Обработчик изменения в поле ввода
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Получаем текущую дату
  const today = new Date();
  
  // Форматируем дату
  const formattedDate = today.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Обработчик открытия/закрытия меню
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-background text-foreground">
      <div className="flex items-center space-x-4">
        {/* Кнопка для открытия/закрытия меню */}
        <Button
          variant="ghost"
          size="icon"
          className="text-foreground hover:bg-accent"
          onClick={toggleMenu} // Обработчик нажатия
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Button variant="ghost" className="text-foreground hover:bg-accent">
          {formattedDate} {/* Здесь выводится сегодняшняя дата */}
        </Button>
      </div>

      {/* Показать меню, если оно открыто */}
      {menuOpen && (
        <div className="absolute top-16 left-0 bg-white shadow-lg p-4 rounded">
          <ul>
            <li>Вы в главном меню</li>
          </ul>
        </div>
      )}

      <div className="flex-1 max-w-md px-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Поиск"
            value={searchQuery} // Связываем с состоянием
            onChange={handleSearchChange} // Обработчик изменения
            className="w-full bg-muted text-foreground placeholder-muted-foreground border-none pl-8 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Показать текущий поисковый запрос */}
        <div className="mt-2">
          {searchQuery && (
            <p>Вы ищете: {searchQuery}</p> // Например, показываем текущий запрос
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Привет, {session?.user?.name}</span>
        <Button className="w-full" onClick={() => signOut()}>
          Выйти
        </Button>
      </div>
    </nav>
  );
}

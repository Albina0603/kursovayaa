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

  // Пример данных для поиска (можете заменить на реальные данные)
  const data = [
  ];

  // Фильтрация данных на основе поискового запроса
  const filteredData = data.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Обработка изменений в поле ввода
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

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-2 bg-background text-foreground">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" className="text-foreground hover:bg-accent">
            {formattedDate} {/* Здесь выводится сегодняшняя дата */}
          </Button>
        </div>

        <div className="flex-1 max-w-md px-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              value={searchQuery} // Связываем с состоянием
              onChange={handleSearchChange} // Обработчик изменения
              className="w-full bg-muted text-foreground placeholder-muted-foreground border-none pl-8 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Показать результаты поиска */}
          <div className="mt-2">
            {filteredData.length === 0 ? (
              <p>No results found</p> // Если нет совпадений
            ) : (
              <ul>
                {filteredData.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Hi, {session?.user?.email}</span>
          <Button className="w-full" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </nav>
    </>
  );
}

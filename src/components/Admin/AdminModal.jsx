import React, { useState } from 'react';
import { 
  X, Search, Bell, Grid, Sun, Moon, Settings, LogOut, LayoutDashboard, User, CheckCircle2,
  Package, ShoppingCart, Users, Layers, Monitor, Type, FormInput, FileText, ChevronRight,
  TrendingUp, Activity, Box, BarChart3, Clock, DollarSign, Plus, Trash2, Edit, Globe
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { getFallbackImage } from '../../data/products';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const translations = {
  uz: {
    main: "Asosiy",
    ecommerce: "Savdo",
    ui_elements: "UI Elementlar",
    dashboard: "Asosiy Panel",
    products: "Mahsulotlar",
    orders: "Buyurtmalar",
    users: "Mijozlar",
    widgets: "Vidjetlar",
    components: "Komponentlar",
    icons: "Ikonkalar",
    search: "Qidirish...",
    admin_user: "Admin",
    administrator: "Administrator",
    sales_overview: "Sotuvlar Statistikasi",
    visits: "Tashriflar",
    sales: "Sotuvlar",
    order_status: "Buyurtmalar Holati",
    categories: "Kategoriyalar",
    total_orders: "Jami Buyurtmalar",
    total_revenue: "Jami Daromad",
    new_users: "Yangi Mijozlar",
    sold_items: "Sotilgan Tovarlar",
    add_product: "Mahsulot Qo'shish",
    product: "Mahsulot",
    price: "Narxi",
    category: "Kategoriya",
    action: "Harakat",
    recent_orders: "Oxirgi Buyurtmalar",
    order_id: "Buyurtma ID",
    date: "Sana",
    amount: "Summa",
    status: "Holati",
    no_orders: "Hozircha buyurtmalar yo'q",
    registered_users: "Ro'yxatdan o'tganlar",
    username: "Ism",
    phone: "Telefon",
    role: "Rol",
    joined: "Qo'shilgan sana",
    no_users: "Mijozlar yo'q",
    details: "Batafsil",
    pending: "Kutilmoqda",
    processing: "Tayyorlanmoqda",
    shipped: "Yo'lda",
    delivered: "Yetkazildi",
    cancelled: "Bekor qilindi",
    notifications: "Bildirishnomalar",
    mark_read: "Barchasini o'qilgan qilish",
    no_notif: "Yangi xabarlar yo'q",
    profile: "Profil",
    settings: "Sozlamalar",
    logout: "Tizimdan chiqish"
  },
  ru: {
    main: "Главная",
    ecommerce: "Магазин",
    ui_elements: "UI Элементы",
    dashboard: "Панель",
    products: "Товары",
    orders: "Заказы",
    users: "Пользователи",
    widgets: "Виджеты",
    components: "Компоненты",
    icons: "Иконки",
    search: "Поиск...",
    admin_user: "Админ",
    administrator: "Администратор",
    sales_overview: "Обзор продаж",
    visits: "Визиты",
    sales: "Продажи",
    order_status: "Статус заказов",
    categories: "Категории",
    total_orders: "Всего заказов",
    total_revenue: "Общий доход",
    new_users: "Новые клиенты",
    sold_items: "Проданные товары",
    add_product: "Добавить товар",
    product: "Товар",
    price: "Цена",
    category: "Категория",
    action: "Действие",
    recent_orders: "Последние заказы",
    order_id: "ID Заказа",
    date: "Дата",
    amount: "Сумма",
    status: "Статус",
    no_orders: "Пока нет заказов",
    registered_users: "Зарегистрированные",
    username: "Имя",
    phone: "Телефон",
    role: "Роль",
    joined: "Присоединился",
    no_users: "Нет пользователей",
    details: "Детали",
    pending: "В ожидании",
    processing: "В обработке",
    shipped: "Отправлен",
    delivered: "Доставлен",
    cancelled: "Отменен",
    notifications: "Уведомления",
    mark_read: "Прочитать все",
    no_notif: "Нет новых сообщений",
    profile: "Профиль",
    settings: "Настройки",
    logout: "Выйти"
  },
  en: {
    main: "Main",
    ecommerce: "E-Commerce",
    ui_elements: "UI Elements",
    dashboard: "Dashboard",
    products: "Products",
    orders: "Orders",
    users: "Users",
    widgets: "Widgets",
    components: "Components",
    icons: "Icons",
    search: "Search...",
    admin_user: "Admin",
    administrator: "Administrator",
    sales_overview: "Sales Overview",
    visits: "Visits",
    sales: "Sales",
    order_status: "Order Status",
    categories: "Categories",
    total_orders: "Total Orders",
    total_revenue: "Total Revenue",
    new_users: "New Users",
    sold_items: "Sold Items",
    add_product: "Add Product",
    product: "Product",
    price: "Price",
    category: "Category",
    action: "Action",
    recent_orders: "Recent Orders",
    order_id: "Order ID",
    date: "Date",
    amount: "Amount",
    status: "Status",
    no_orders: "No orders yet",
    registered_users: "Registered Users",
    username: "Username",
    phone: "Phone",
    role: "Role",
    joined: "Joined",
    no_users: "No users yet",
    details: "Details",
    pending: "Pending",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    notifications: "Notifications",
    mark_read: "Mark all read",
    no_notif: "No new notifications",
    profile: "Profile",
    settings: "Settings",
    logout: "Log Out"
  }
};

export const AdminModal = () => {
  const {
    isAdminOpen, setIsAdminOpen, user,
    orders, registeredUsers, updateOrderStatus,
    products, addProduct, editProduct, deleteProduct, formatPrice, showToast,
    theme, toggleTheme, language, setLanguage, logoutUser
  } = useShop();

  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('havas_admin_tab') || 'dashboard');
  React.useEffect(() => { localStorage.setItem('havas_admin_tab', activeTab); }, [activeTab]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Interactive States
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdData, setNewProdData] = useState({ title: '', price: '', category: 'mevalar', images: '' });

  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editProdData, setEditProdData] = useState({ id: '', title: '', price: '', category: '', images: '' });

  const handleEditProduct = (e) => {
    e.preventDefault();
    if(!editProdData.title || !editProdData.price) return;
    editProduct(editProdData.id, {
      title: editProdData.title,
      price: Number(editProdData.price),
      category: editProdData.category,
      images: [editProdData.images]
    });
    showToast('Mahsulot yangilandi!', 'success');
    setIsEditProductOpen(false);
  };


  const handleAddNewProduct = (e) => {
    e.preventDefault();
    if(!newProdData.title || !newProdData.price) return;
    const prod = {
      id: 'prod-' + Date.now(),
      title: newProdData.title,
      price: Number(newProdData.price),
      category: newProdData.category,
      images: [newProdData.images || 'https://via.placeholder.com/300?text=Havas+Market']
    };
    addProduct(prod);
    showToast('Yangi mahsulot q\'oshildi!', 'success');
    setIsAddProductOpen(false);
    setNewProdData({ title: '', price: '', category: 'mevalar', images: '' });
  };

    const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Order #8921', time: '2 mins ago' },
    { id: 2, title: 'New User Registered', time: '1 hour ago' }
  ]);

  const t = translations[language] || translations.uz;

  // Search Logic
  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredOrders = orders.filter(o => o.id.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredUsers = registeredUsers.filter(u => u.username?.toLowerCase().includes(searchQuery.toLowerCase()) || u.phone?.includes(searchQuery));

  // Dynamic Dashboard Data
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
  const totalUsers = registeredUsers.length;
  const totalItemsSold = orders.reduce((sum, order) => sum + (order.items || []).reduce((s, i) => s + (i.quantity || 1), 0), 0);

  // Chart Data
  const salesData = [
    { name: 'Mo', visits: 10, sales: 5 },
    { name: 'Tu', visits: 20, sales: 30 },
    { name: 'We', visits: 14, sales: 16 },
    { name: 'Th', visits: 13, sales: 23 },
    { name: 'Fr', visits: 17, sales: 7 },
    { name: 'Sa', visits: 7, sales: 13 },
    { name: 'Su', visits: 10, sales: 11 },
  ];

  const orderStatusData = [
    { name: 'Jan', value: 9 },
    { name: 'Feb', value: 7 },
    { name: 'Mar', value: 14 },
    { name: 'Apr', value: 10 },
    { name: 'May', value: 12 },
    { name: 'Jun', value: totalOrders > 0 ? totalOrders : 8 },
  ];

  const donutData = [
    { name: 'Mevalar', value: products.filter(p => p.category === 'mevalar').length || 20, color: '#ff4d4f' },
    { name: 'Sabzavot', value: products.filter(p => p.category === 'sabzavotlar').length || 30, color: '#52c41a' },
    { name: 'Sut', value: products.filter(p => p.category === 'sut-mahsulotlari').length || 15, color: '#1890ff' },
  ];

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-[#0f0f11] z-[100] flex overflow-hidden font-sans text-gray-700 dark:text-gray-300 transition-colors">
      
      {/* Sidebar */}
      <aside className={`bg-white dark:bg-[#151518] border-r border-gray-200 dark:border-gray-800 transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-[260px]' : 'w-[70px]'} shrink-0`}>
        <div className="h-16 flex items-center px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-xl shrink-0">H</div>
            {sidebarOpen && <span className="font-bold text-gray-900 dark:text-white text-lg tracking-wide truncate">Havas Admin</span>}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-3 space-y-1">
          {sidebarOpen && <div className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider mb-2 px-2 mt-4">{t.main}</div>}
          <NavItem icon={<LayoutDashboard size={18} />} label={t.dashboard} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} open={sidebarOpen} />
          
          {sidebarOpen && <div className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider mb-2 px-2 mt-6">{t.ecommerce}</div>}
          <NavItem icon={<Package size={18} />} label={t.products} active={activeTab === 'products'} onClick={() => setActiveTab('products')} open={sidebarOpen} />
          <NavItem icon={<ShoppingCart size={18} />} label={t.orders} active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} open={sidebarOpen} />
          <NavItem icon={<Users size={18} />} label={t.users} active={activeTab === 'users'} onClick={() => setActiveTab('users')} open={sidebarOpen} />
          
          {sidebarOpen && <div className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider mb-2 px-2 mt-6">{t.ui_elements}</div>}
          <NavItem icon={<Layers size={18} />} label={t.widgets} active={activeTab === 'widgets'} onClick={() => setActiveTab('widgets')} open={sidebarOpen} />
          <NavItem icon={<Monitor size={18} />} label={t.components} active={activeTab === 'components'} onClick={() => setActiveTab('components')} open={sidebarOpen} />
          <NavItem icon={<Type size={18} />} label={t.icons} active={activeTab === 'icons'} onClick={() => setActiveTab('icons')} open={sidebarOpen} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-gray-100 dark:bg-[#0f0f11]">
        
        <header className="h-16 bg-white dark:bg-[#151518] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Grid size={20} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.search}
                className="bg-gray-100 dark:bg-[#1f1f23] text-sm text-gray-800 dark:text-gray-200 rounded-full pl-10 pr-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 border border-transparent w-64 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Language */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white uppercase text-sm font-bold"
              >
                <Globe size={18} /> {language}
              </button>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)}></div>
                  <div className="absolute top-full mt-2 right-0 bg-white dark:bg-[#1a1a1f] border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl py-2 z-50 min-w-[120px] animate-fade-in">
                    <button onClick={() => { setLanguage('uz'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#25252b] text-sm">Uzbek</button>
                    <button onClick={() => { setLanguage('ru'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#25252b] text-sm">Russian</button>
                    <button onClick={() => { setLanguage('en'); setIsLangOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#25252b] text-sm">English</button>
                  </div>
                </>
              )}
            </div>

            {/* Theme */}
            <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white relative"
              >
                <Bell size={20} />
                {notifications.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[9px] font-bold text-white rounded-full flex items-center justify-center">{notifications.length}</span>}
              </button>
              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)}></div>
                  <div className="absolute top-full mt-2 right-0 bg-white dark:bg-[#1a1a1f] border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl z-50 w-72 animate-fade-in overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 font-bold text-gray-900 dark:text-white flex justify-between items-center">
                      {t.notifications}
                      {notifications.length > 0 && <span onClick={() => setNotifications([])} className="text-xs text-emerald-500 cursor-pointer hover:underline">{t.mark_read}</span>}
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-gray-500 text-sm">{t.no_notif}</div>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#25252b] cursor-pointer">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">{n.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{n.time}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <div className="relative border-l border-gray-200 dark:border-gray-700 pl-4 sm:pl-6 ml-2">
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors">{user?.username || t.admin_user}</div>
                  <div className="text-[11px] text-gray-500">{t.administrator}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold overflow-hidden">
                  {user?.username?.[0]?.toUpperCase() || 'A'}
                </div>
              </div>
              
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute top-full mt-2 right-0 bg-white dark:bg-[#1a1a1f] border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl py-2 z-50 min-w-[150px] animate-fade-in">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#25252b] text-sm flex items-center gap-2"><User size={14}/> {t.profile}</button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#25252b] text-sm flex items-center gap-2"><Settings size={14}/> {t.settings}</button>
                    <div className="my-1 border-b border-gray-200 dark:border-gray-800"></div>
                    <button onClick={() => {
                      if (logoutUser) logoutUser();
                      setIsAdminOpen(false);
                      setIsProfileOpen(false);
                      showToast('Tizimdan chiqildi');
                    }} className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm text-red-500 flex items-center gap-2">
                      <LogOut size={14}/> {t.logout}
                    </button>
                  </div>
                </>
              )}
            </div>
            
            <button onClick={() => setIsAdminOpen(false)} className="text-gray-400 hover:text-red-500 ml-2">
              <X size={24} />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#1a1a1f] rounded-xl border border-gray-200 dark:border-gray-800 p-5 lg:col-span-2 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-gray-900 dark:text-white font-semibold">{t.sales_overview}</h3>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5"><div className="w-8 h-1 bg-amber-400"></div>{t.visits}</div>
                      <div className="flex items-center gap-1.5"><div className="w-8 h-1 bg-blue-500"></div>{t.sales}</div>
                    </div>
                  </div>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                        <RechartsTooltip contentStyle={{backgroundColor: theme === 'dark' ? '#1f1f23' : '#fff', borderColor: theme === 'dark' ? '#374151' : '#e5e7eb', borderRadius: '8px'}} itemStyle={{color: theme === 'dark' ? '#fff' : '#000'}} />
                        <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                        <Area type="monotone" dataKey="visits" stroke="#fbbf24" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#1a1a1f] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-gray-900 dark:text-white font-semibold">{t.order_status}</h3>
                  </div>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={orderStatusData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barSize={10}>
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ff4d4f" />
                            <stop offset="100%" stopColor="#ff9c6e" />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                        <RechartsTooltip cursor={{fill: theme === 'dark' ? '#2a2a35' : '#f3f4f6'}} contentStyle={{backgroundColor: theme === 'dark' ? '#1f1f23' : '#fff', borderColor: theme === 'dark' ? '#374151' : '#e5e7eb', borderRadius: '8px', color: theme === 'dark' ? '#fff' : '#000'}} />
                        <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 4, 4]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#1a1a1f] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-lg">
                  <div className="h-[280px] w-full flex items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={donutData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                          {donutData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">{t.categories}</span>
                      <span className="text-gray-500 dark:text-gray-400">{products.length}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <StatCard title={t.total_orders} value={totalOrders} trend="+25%" icon={<ShoppingCart className="text-blue-500" size={24} />} chartColor="#3b82f6" />
                  <StatCard title={t.total_revenue} value={formatPrice(totalRevenue)} trend="+15%" icon={<DollarSign className="text-red-500" size={24} />} chartColor="#ef4444" />
                  <StatCard title={t.new_users} value={totalUsers} trend="-10%" trendDown icon={<Users className="text-emerald-500" size={24} />} chartColor="#10b981" />
                  <StatCard title={t.sold_items} value={totalItemsSold} trend="-14%" trendDown icon={<Package className="text-amber-500" size={24} />} chartColor="#f59e0b" />
                </div>
              </div>
            </>
          )}

          {/* Products Table */}
          {activeTab === 'products' && (
            <div className="bg-white dark:bg-[#1a1a1f] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t.products} ({filteredProducts.length})</h3>
                <button 
                  onClick={() => {
                    const newProd = {
                      id: 'prod-' + Date.now(),
                      title: 'Yangi mahsulot',
                      price: 15000,
                      category: 'mevalar',
                      images: []
                    };
                    addProduct(newProd);
                    showToast('Yangi mahsulot qo\'shildi');
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                >
                  <Plus size={16} /> {t.add_product}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-[#1e1e24] border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="px-4 py-3">{t.product}</th>
                      <th className="px-4 py-3">{t.price}</th>
                      <th className="px-4 py-3">{t.category}</th>
                      <th className="px-4 py-3 text-right">{t.action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.slice(0, 50).map(p => (
                      <tr key={p.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1f1f24] transition-colors">
                        <td className="px-4 py-3 flex items-center gap-3">
                          <img src={p.images?.[0] || getFallbackImage()} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-gray-800" />
                          <span className="font-medium text-gray-900 dark:text-gray-200 line-clamp-1">{p.title}</span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{formatPrice(p.price)} sum</td>
                        <td className="px-4 py-3"><span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs">{p.category}</span></td>
                        <td className="px-4 py-3 text-right">
                          
                            <button onClick={() => {
                              setEditProdData({
                                id: p.id,
                                title: p.title,
                                price: p.price,
                                category: p.category || 'mevalar',
                                images: p.images?.[0] || ''
                              });
                              setIsEditProductOpen(true);
                            }} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 p-2">
                              <Edit size={16} />
                            </button>

                          <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-2">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Orders Table */}
          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-[#1a1a1f] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t.recent_orders} ({filteredOrders.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-[#1e1e24] border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="px-4 py-3">{t.order_id}</th>
                      <th className="px-4 py-3">{t.date}</th>
                      <th className="px-4 py-3">{t.amount}</th>
                      <th className="px-4 py-3">{t.status}</th>
                      <th className="px-4 py-3">{t.action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 && <tr><td colSpan="5" className="text-center py-8">{t.no_orders}</td></tr>}
                    {filteredOrders.map(order => (
                      <tr key={order.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1f1f24] transition-colors">
                        <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-mono">#{order.id.slice(-6)}</td>
                        <td className="px-4 py-3">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white font-semibold">{formatPrice(order.totalAmount)} sum</td>
                        <td className="px-4 py-3">
                          <select 
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded outline-none"
                          >
                            <option value="pending">{t.pending}</option>
                            <option value="processing">{t.processing}</option>
                            <option value="shipped">{t.shipped}</option>
                            <option value="delivered">{t.delivered}</option>
                            <option value="cancelled">{t.cancelled}</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 px-2 py-1 bg-blue-50 dark:bg-blue-500/10 rounded text-xs border border-blue-200 dark:border-blue-500/20">
                            {t.details}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Table */}
          {activeTab === 'users' && (
            <div className="bg-white dark:bg-[#1a1a1f] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">{t.registered_users} ({filteredUsers.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-[#1e1e24] border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="px-4 py-3">{t.username}</th>
                      <th className="px-4 py-3">{t.phone}</th>
                      <th className="px-4 py-3">{t.role}</th>
                      <th className="px-4 py-3">{t.joined}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 && <tr><td colSpan="4" className="text-center py-8">{t.no_users}</td></tr>}
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#1f1f24] transition-colors">
                        <td className="px-4 py-3 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                            {u.username?.[0]?.toUpperCase()}
                          </div>
                          <span className="text-gray-900 dark:text-gray-200 font-medium">{u.username}</span>
                        </td>
                        <td className="px-4 py-3">{u.phone || 'N/A'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-xs ${u.role === 'admin' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>
                            {u.role || 'user'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(u.joinedAt || Date.now()).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Widgets Tab */}
          {activeTab === 'widgets' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                <h3 className="text-lg font-semibold opacity-90">Server Load</h3>
                <div className="text-4xl font-black mt-2 mb-4">42%</div>
                <div className="w-full bg-black/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{width: '42%'}}></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-6 rounded-xl text-white shadow-lg">
                <h3 className="text-lg font-semibold opacity-90">Active Connections</h3>
                <div className="text-4xl font-black mt-2 mb-4">1,204</div>
                <div className="flex gap-1 h-8 items-end">
                  {[40, 70, 45, 90, 60, 100, 80, 50, 75, 40].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/30 rounded-t-sm" style={{height: `${h}%`}}></div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-6 rounded-xl text-white shadow-lg">
                <h3 className="text-lg font-semibold opacity-90">Disk Space</h3>
                <div className="text-4xl font-black mt-2 mb-4">78% Full</div>
                <p className="text-sm opacity-80">1.2 TB of 1.5 TB Used</p>
              </div>
            </div>
          )}

          {/* Components Tab */}
          {activeTab === 'components' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1a1a1f] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-600">Primary</button>
                  <button className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700">Secondary</button>
                  <button className="bg-red-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-600">Danger</button>
                  <button className="border border-emerald-500 text-emerald-500 px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-500/10">Outline</button>
                </div>
              </div>
            </div>
          )}

          {/* Icons Tab */}
          {activeTab === 'icons' && (
            <div className="bg-white dark:bg-[#1a1a1f] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Lucide React Library</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
                {[LayoutDashboard, ShoppingCart, Users, Package, Settings, Sun, Moon, Bell, Search, X, CheckCircle2, DollarSign, Activity, TrendingUp, Box, Layers, Monitor, Type, FormInput, FileText].map((Icon, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-[#151518] rounded-xl border border-gray-100 dark:border-gray-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer text-gray-500 dark:text-gray-400 hover:text-emerald-500">
                    <Icon size={24} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
                
      {/* Add Product Modal */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1a1a1f] w-full max-w-md rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Yangi Mahsulot Qo'shish</h3>
            <form onSubmit={handleAddNewProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomi</label>
                <input type="text" required value={newProdData.title} onChange={e => setNewProdData({...newProdData, title: e.target.value})} className="w-full bg-gray-50 dark:bg-[#151518] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500" placeholder="Masalan: Qizil Olma" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Narxi (so'm)</label>
                <input type="number" required value={newProdData.price} onChange={e => setNewProdData({...newProdData, price: e.target.value})} className="w-full bg-gray-50 dark:bg-[#151518] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500" placeholder="15000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategoriya</label>
                <select value={newProdData.category} onChange={e => setNewProdData({...newProdData, category: e.target.value})} className="w-full bg-gray-50 dark:bg-[#151518] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500">
                  <option value="mevalar">Mevalar</option>
                  <option value="sabzavotlar">Sabzavotlar</option>
                  <option value="ichimliklar">Ichimliklar</option>
                  <option value="sut-mahsulotlari">Sut mahsulotlari</option>
                  <option value="shirinliklar">Shirinliklar</option>
                  <option value="non-mahsulotlari">Non mahsulotlari</option>
                  <option value="gosht">Go'sht mahsulotlari</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rasm URL (Ssilka)</label>
                <input type="text" value={newProdData.images} onChange={e => setNewProdData({...newProdData, images: e.target.value})} className="w-full bg-gray-50 dark:bg-[#151518] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500" placeholder="https://..." />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button type="button" onClick={() => setIsAddProductOpen(false)} className="px-5 py-2 rounded-xl text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800">Bekor qilish</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 shadow-md">Qo'shish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditProductOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1a1a1f] w-full max-w-md rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mahsulotni O'zgartirish</h3>
            <form onSubmit={handleEditProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nomi</label>
                <input type="text" required value={editProdData.title} onChange={e => setEditProdData({...editProdData, title: e.target.value})} className="w-full bg-gray-50 dark:bg-[#151518] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Narxi (so'm)</label>
                <input type="number" required value={editProdData.price} onChange={e => setEditProdData({...editProdData, price: e.target.value})} className="w-full bg-gray-50 dark:bg-[#151518] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategoriya</label>
                <select value={editProdData.category} onChange={e => setEditProdData({...editProdData, category: e.target.value})} className="w-full bg-gray-50 dark:bg-[#151518] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500">
                  <option value="mevalar">Mevalar</option>
                  <option value="sabzavotlar">Sabzavotlar</option>
                  <option value="ichimliklar">Ichimliklar</option>
                  <option value="sut-mahsulotlari">Sut mahsulotlari</option>
                  <option value="shirinliklar">Shirinliklar</option>
                  <option value="non-mahsulotlari">Non mahsulotlari</option>
                  <option value="gosht">Go'sht mahsulotlari</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rasm URL (Ssilka)</label>
                <input type="text" value={editProdData.images} onChange={e => setEditProdData({...editProdData, images: e.target.value})} className="w-full bg-gray-50 dark:bg-[#151518] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button type="button" onClick={() => setIsEditProductOpen(false)} className="px-5 py-2 rounded-xl text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800">Bekor qilish</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 shadow-md">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

        </main>
      </div>
    );
  };

const NavItem = ({ icon, label, active, onClick, open }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg mb-1 transition-colors ${
        active ? 'bg-gradient-to-r from-gray-100 dark:from-gray-800 to-transparent text-emerald-600 dark:text-white border-l-2 border-emerald-500 font-bold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
      } ${!open && 'justify-center px-0'}`}
    >
      <div className="flex items-center gap-3">
        <span className={active ? 'text-emerald-500' : ''}>{icon}</span>
        {open && <span className="text-sm">{label}</span>}
      </div>
    </button>
  );
};

const StatCard = ({ title, value, trend, trendDown, icon, chartColor }) => {
  const bars = Array.from({length: 30}, () => Math.random() * 100);
  return (
    <div className="bg-white dark:bg-[#1a1a1f] rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-lg flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h4>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</div>
        </div>
        {icon}
      </div>
      <div className="flex items-end justify-between mt-auto">
        <div className="flex items-end gap-[2px] h-6 w-32">
          {bars.map((h, i) => (
            <div key={i} className="w-1 rounded-t-sm" style={{height: `${h}%`, backgroundColor: chartColor, opacity: 0.8}}></div>
          ))}
        </div>
        <span className={`text-xs font-bold ${trendDown ? 'text-red-500' : 'text-emerald-500'}`}>{trend}</span>
      </div>
    </div>
  );
};

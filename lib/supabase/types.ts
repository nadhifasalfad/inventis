export type UserRole = "owner" | "kepala_toko" | "kepala_gudang";

export type MovementCategory = "fast_moving" | "medium_moving" | "slow_moving";

export type Category = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  category_id: string | null;
  category: Category | null;
  purchase_price: number;
  selling_price: number;
  current_stock: number;
  safety_stock: number;
  movement_category: MovementCategory;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Profile, "id">>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string;
          type: string;
          link_url: string | null;
          related_id: string | null;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          title: string;
          message: string;
          type?: string;
          link_url?: string | null;
          related_id?: string | null;
          is_read?: boolean;
        };
        Update: Partial<{
          is_read: boolean;
        }>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Category, "id">>;
      };
      products: {
        Row: Omit<Product, "category">;
        Insert: Omit<Product, "id" | "category" | "created_at" | "updated_at">;
        Update: Partial<Omit<Product, "id" | "category" | "created_at">>;
      };
      sales_history: {
        Row: {
          id: string;
          product_id: string;
          sale_date: string;
          quantity_sold: number;
          revenue: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          product_id: string;
          sale_date: string;
          quantity_sold: number;
          revenue?: number;
          notes?: string | null;
        };
        Update: never;
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          table_name: string;
          record_id: string | null;
          old_data: Record<string, unknown> | null;
          new_data: Record<string, unknown> | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          user_id?: string | null;
          action: string;
          table_name: string;
          record_id?: string | null;
          old_data?: Record<string, unknown> | null;
          new_data?: Record<string, unknown> | null;
          ip_address?: string | null;
        };
        Update: {
          user_id?: string | null;
          action?: string;
          table_name?: string;
        };
      };
    };
  };
};

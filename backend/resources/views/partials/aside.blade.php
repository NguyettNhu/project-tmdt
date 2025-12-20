<aside class="main-sidebar sidebar-dark-primary elevation-4">
  <div class="sidebar">
    <div class="user-panel mt-3 pb-3 mb-3 text-center d-flex flex-column align-items-center">
      <div class="image mb-2">
        <img src="{{ auth()->user()->image
              ? asset('/storage/uploads/user/' . auth()->user()->image)
              : asset('/assets/img/img-default.jpg') }}" alt="User Image" class="img-circle" style="
                width: 80px;
                height: 77px;
                object-fit: cover;
                border-radius: 50%;
                border: 2px solid #fff;
                box-shadow: 0 2px 6px rgba(0,0,0,0.25);
            ">
      </div>
      <div class="info">
        <a href="#" class="d-block" style="
                font-size: 16px;
                font-weight: 600;
                color: #fff;
                margin-left: 10px;
            ">
          {{ auth()->user()->name }}
        </a>
      </div>
    </div>
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        @foreach ($modules as $item)
          <li class="nav-item">
            <a href="{{ route($item['route']) }}"
              class="nav-link {{ request()->routeIs($item['route']) ? 'active' : '' }}">
              <i class="nav-icon fa {{ $item['icon'] }}"></i>
              <p>{{ $item['name'] }}</p>
            </a>
          </li>
        @endforeach
      </ul>
    </nav>
  </div>
  <style>
  .user-panel {
  margin-left: -20px;
  }
  .sidebar-collapse .user-panel {
    margin-left: -10px !important; 
    padding: 10px 0 !important; 
    margin-bottom: 0 !important;
  }
  .sidebar-collapse .sidebar .user-panel .image img {
    width: 55px !important; 
    height: 55px !important;
    display: block;
    margin: 0 auto;
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
  }
  </style>
</aside>